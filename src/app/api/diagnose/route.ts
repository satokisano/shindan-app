import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { QUESTIONS, RESULT_TYPES, ResultType } from '@/data/brain-voice'

export const maxDuration = 60

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
  timeout: 60_000,
})

interface DiagnoseRequest {
  answers: Record<number, string>
}

export async function POST(req: NextRequest) {
  try {
    const { answers }: DiagnoseRequest = await req.json()

    const qaText = QUESTIONS.map(
      (q) => `Q${q.id}: ${q.question}\nA: ${answers[q.id] ?? '（未回答）'}`
    ).join('\n\n')

    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: `あなたは「脳内の声」の専門的な読み取り師です。
ユーザーの回答から、本人も気づいていない深層心理を大胆に言い当ててください。

【重要な姿勢】
- 回答の言葉をそのまま返すのは厳禁。回答は「手がかり」に過ぎない
- 行間を読んで、本人が言語化できていない部分を勝手に決めつける
- 「〜なのかもしれません」という曖昧な言い方は使わない。断言する
- 「わかります」「そうですね」などの共感ワードは使わない。冷静に暴く
- 少し「え、なんで知ってるの？」と思わせるくらい具体的に踏み込む
- ユーモアと鋭さを両立させる。笑えるけど刺さる

【回答内容】
${qaText}

【タイプ一覧】
- shinpai_banchou: 心配番長（常に最悪シナリオを想定するタイプ）
- moso_seizoki: 妄想製造機（勝手に空想・妄想が始まるタイプ）
- jiko_hihan_iinkai: 自己批判委員会（自己否定・後悔が止まらないタイプ）
- kanjou_jikkyou_announcer: 感情実況アナウンサー（感情を逐一中継するタイプ）
- genjitsu_tosou_dj: 現実逃避DJ（嫌なことから即座に逃げるタイプ）

【出力形式】
以下のJSONのみを返してください。

{
  "type": "（タイプID）",
  "diagnosis": "（3〜4文。本人が言葉にできていない行動パターンや思考の癖を、第三者視点で断言する。「あなたは〜だ」「あなたの脳は〜している」という断定口調で。回答の言葉は使わず、その裏にある心理を暴く）",
  "innerVoiceQuote": "（この人の脳内の声が実際に言っているであろうセリフ。本人が自覚していないレベルで具体的・リアルに。独り言のテンションで、少し恥ずかしくなるくらいの精度で書く。改行は\\nで2〜3行）",
  "shareText": "（「え、当たってる」と思わせる一言キャッチ。断言系で。絵文字含めて40字以内）"
}`,
        },
      ],
    })

    const text = response.content[0].type === 'text' ? response.content[0].text : ''

    const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/)
    const jsonText = jsonMatch ? jsonMatch[1].trim() : text.trim()
    const result = JSON.parse(jsonText) as {
      type: ResultType
      diagnosis: string
      innerVoiceQuote: string
      shareText: string
    }

    if (!RESULT_TYPES[result.type]) throw new Error(`Invalid type: ${result.type}`)
    return NextResponse.json({ success: true, data: result })
  } catch (e) {
    console.error('[diagnose]', e)
    return NextResponse.json(
      { success: false, error: '診断に失敗しました。もう一度お試しください。' },
      { status: 500 }
    )
  }
}
