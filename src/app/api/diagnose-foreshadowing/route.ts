import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { FORESHADOWING_QUESTIONS, FORESHADOWING_TYPES, ForeshadowingType } from '@/data/life-foreshadowing'

export const maxDuration = 60

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
  timeout: 60_000,
})

export async function POST(req: NextRequest) {
  try {
    const { answers }: { answers: Record<number, string> } = await req.json()

    const qaText = FORESHADOWING_QUESTIONS.map(
      (q) => `Q${q.id}: ${q.question}\nA: ${answers[q.id] ?? '（未回答）'}`
    ).join('\n\n')

    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: `あなたは「人生の物語構造」を読み解く小説家兼占い師です。
ユーザーの回答から、その人の人生における伏線の張り方・回収のされ方のパターンを、大胆に断言してください。

【重要な姿勢】
- 回答をそのまま要約するのは絶対禁止。回答は「素材」であり、読み解くのはあなたの仕事
- 本人が言語化できていない「人生のパターン」を、第三者として断言する
- 「〜かもしれません」「〜ではないでしょうか」は使わない。すべて断定
- 少し痛いくらい的確に、でも読んでいてニヤッとできるトーンで
- 物語・文学的な表現を使って、ドラマチックに語る
- 「え、なんでそこまで知ってるの」と思わせるくらい踏み込む

【回答内容】
${qaText}

【タイプ一覧】
- josho_放置型: 序盤放置型伏線（最初から全部張ってあったのに誰も気づかなかった）
- kaishuu_sarenai型: 未回収伏線（大量の伏線が宙ぶらりんのまま物語が進んでいる）
- chokuzen_kaishuu型: 直前回収型伏線（ギリギリまで動かないが最後に全部繋がる）
- reader_barebarre型: 読者バレバレ型伏線（本人だけが気づいていない、周りには丸見え）
- dondengaeshi型: どんでん返し型伏線（後から読み返すと全部繋がっていた構造）

【出力形式】
以下のJSONのみを返してください。

{
  "type": "（タイプID）",
  "diagnosis": "（3〜4文。その人の人生の構造を物語として語る。「あなたの人生は〜という構造をしている」「あなたという物語の〜章は〜だ」という断言口調で。回答の言葉は使わず、その人の人生パターンを暴く）",
  "innerVoiceQuote": "（この人の人生の「語り手」（ナレーター）が言いそうなセリフ。物語の外から見ている存在として、その人の人生を実況する。少し皮肉で、でも愛がある。改行は\\nで2〜3行）",
  "shareText": "（「わかりすぎる」と思わせる一言キャッチ。物語的な表現で断言。絵文字含めて40字以内）"
}`,
        },
      ],
    })

    const text = response.content[0].type === 'text' ? response.content[0].text : ''
    const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/)
    const jsonText = jsonMatch ? jsonMatch[1].trim() : text.trim()
    const result = JSON.parse(jsonText) as {
      type: ForeshadowingType
      diagnosis: string
      innerVoiceQuote: string
      shareText: string
    }

    if (!FORESHADOWING_TYPES[result.type]) throw new Error(`Invalid type: ${result.type}`)
    return NextResponse.json({ success: true, data: result })
  } catch (e) {
    console.error('[diagnose-foreshadowing]', e)
    return NextResponse.json(
      { success: false, error: '診断に失敗しました。もう一度お試しください。' },
      { status: 500 }
    )
  }
}
