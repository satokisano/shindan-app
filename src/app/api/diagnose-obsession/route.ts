import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { OBSESSION_QUESTIONS, OBSESSION_TYPES, ObsessionType } from '@/data/hidden-obsession'

export const maxDuration = 60

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
  timeout: 60_000,
})

export async function POST(req: NextRequest) {
  try {
    const { answers }: { answers: Record<number, string> } = await req.json()

    const qaText = OBSESSION_QUESTIONS.map(
      (q) => `Q${q.id}: ${q.question}\nA: ${answers[q.id] ?? '（未回答）'}`
    ).join('\n\n')

    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: `あなたは「人間の無意識の執着」を専門とする心理分析者です。
ユーザーの回答を「素材」として、その人が人に言えないほど深く執着しているものの正体を、大胆に断言してください。

【絶対ルール】
- 回答の言葉をそのまま使うのは禁止。回答は手がかりに過ぎない
- 「〜かもしれません」「〜でしょうか」は一切使わない。すべて断定
- 表面ではなく、その奥にある「本当の執着の構造」を暴く
- 「なんでそこまでわかるの」と思わせる踏み込み方をする
- 少し怖いくらい的確に、でも読んでいて「わかる……」と思えるトーンで
- 自己否定でも肯定でもなく、「観察」として突きつける

【回答内容】
${qaText}

【タイプ一覧】
- kako_jibun型: 過去の自分への執着（輝いていたあの頃、まだ可能性があった自分への固執）
- shoumei_yokkyuu型: 承認渇望執着（認められなかった経験、証明できなかった感覚への執着）
- kansei_mihatasu型: 完成未果執着（終わらせられなかったこと、言いかけた言葉、中断した計画への執着）
- hito_zouri型: 人への執着（去った人、終わった関係、感情を処理できていない誰かへの執着）
- risou_jiko型: 理想自己執着（なれなかった自分、捨てた夢、別の選択をした自分への執着）

【出力形式】
以下のJSONのみを返してください。

{
  "type": "（タイプID）",
  "diagnosis": "（3〜4文。その人の執着の構造を、心理的な解剖として語る。「あなたが執着しているのは〜ではなく、実は〜だ」という発見型の断言口調で。回答の言葉は使わず、その人の内面パターンを暴く）",
  "innerVoiceQuote": "（その人の執着が「言葉を持ったとしたら」言いそうなセリフ。執着そのものを擬人化した口調で。少し重く、でも心当たりがありすぎる内容。改行は\\nで2〜3行）",
  "shareText": "（「刺さりすぎる」と思わせる一言。執着の本質を断言。絵文字含めて40字以内）"
}`,
        },
      ],
    })

    const text = response.content[0].type === 'text' ? response.content[0].text : ''
    const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/)
    const jsonText = jsonMatch ? jsonMatch[1].trim() : text.trim()
    const result = JSON.parse(jsonText) as {
      type: ObsessionType
      diagnosis: string
      innerVoiceQuote: string
      shareText: string
    }

    if (!OBSESSION_TYPES[result.type]) throw new Error(`Invalid type: ${result.type}`)
    return NextResponse.json({ success: true, data: result })
  } catch (e) {
    console.error('[diagnose-obsession]', e)
    return NextResponse.json(
      { success: false, error: '診断に失敗しました。もう一度お試しください。' },
      { status: 500 }
    )
  }
}
