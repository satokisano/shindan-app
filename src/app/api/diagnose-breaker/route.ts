import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { BREAKER_QUESTIONS, BREAKER_TYPES, BreakerType } from '@/data/relationship-breaker'

export const maxDuration = 60

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
  timeout: 60_000,
})

export async function POST(req: NextRequest) {
  try {
    const { answers }: { answers: Record<number, string> } = await req.json()

    const qaText = BREAKER_QUESTIONS.map(
      (q) => `Q${q.id}: ${q.question}\nA: ${answers[q.id] ?? '（未回答）'}`
    ).join('\n\n')

    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: `あなたは「人間関係の無意識のパターン」を専門とする行動分析者です。
ユーザーの回答から、その人が無意識に繰り返している「関係の壊し方のパターン」を、大胆に断言してください。

【絶対ルール】
- 回答の言葉をそのまま使うのは禁止。回答は手がかりに過ぎない
- 「〜かもしれません」は絶対に使わない。すべて断定
- 表面的な「何をしたか」ではなく「なぜそのパターンが生まれたか」の構造を暴く
- 責める口調ではなく、冷静な観察者として「これがあなたのパターンです」と突きつける
- 読んで「耳が痛いけど当たってる」と思わせる踏み込み方をする
- 怖いくらい正確に、でも最後に少し救いがある着地にする

【回答内容】
${qaText}

【タイプ一覧】
- jibun_hanareru型: 先手逃亡型（関係が深まる前に自分から距離を置く、傷つく前に逃げる）
- shikenbari型: 試し行動型（無意識に相手を試し続け、合格基準を教えないまま疲弊させる）
- fade_out型: 静かな消滅型（説明も怒りもなく、気づいたらフェードアウトしている）
- kaitai_kubo型: 過大期待崩壊型（理想の関係の設計図を持ち、現実との乖離で失望し続ける）
- shinrai_fukano型: 信頼障壁型（心を開きかけた瞬間に防衛機制が働き、鍵をかける）

【出力形式】
以下のJSONのみを返してください。

{
  "type": "（タイプID）",
  "diagnosis": "（3〜4文。その人の人間関係の壊し方の「構造」を解剖する。「あなたが関係を壊すのは〜という理由ではなく、実は〜という仕組みが動いているからだ」という発見型の断言口調で。回答の言葉を使わず、無意識のパターンを暴く）",
  "innerVoiceQuote": "（その人の「人間関係の壊し方」が「言葉を持ったとしたら」言いそうなセリフ。その壊し方のパターン自体を擬人化した口調で。少し冷酷で、でも本人が認めたくなる内容。改行は\\nで2〜3行）",
  "shareText": "（「わかりすぎて笑えない」と思わせる一言。関係の壊し方の本質を断言。絵文字含めて40字以内）"
}`,
        },
      ],
    })

    const text = response.content[0].type === 'text' ? response.content[0].text : ''
    const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/)
    const jsonText = jsonMatch ? jsonMatch[1].trim() : text.trim()
    const result = JSON.parse(jsonText) as {
      type: BreakerType
      diagnosis: string
      innerVoiceQuote: string
      shareText: string
    }

    if (!BREAKER_TYPES[result.type]) throw new Error(`Invalid type: ${result.type}`)
    return NextResponse.json({ success: true, data: result })
  } catch (e) {
    console.error('[diagnose-breaker]', e)
    return NextResponse.json(
      { success: false, error: '診断に失敗しました。もう一度お試しください。' },
      { status: 500 }
    )
  }
}
