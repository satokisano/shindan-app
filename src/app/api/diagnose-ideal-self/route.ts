import { NextRequest, NextResponse } from 'next/server'

export const maxDuration = 60
import Anthropic from '@anthropic-ai/sdk'
import { IDEAL_QUESTIONS, IdealSelfType } from '@/data/ideal-self'

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
  timeout: 60_000,
})

export async function POST(req: NextRequest) {
  try {
    const { answers }: { answers: Record<number, string> } = await req.json()

    const qaText = IDEAL_QUESTIONS.map(
      (q) => `Q${q.id}: ${q.question}\nA: ${answers[q.id] ?? '（未回答）'}`
    ).join('\n\n')

    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: `あなたは「なりたかった自分と今の自分の距離」を専門とする人生分析者です。
ユーザーの回答から、その人が捨てきれていない理想の自分の正体と、今との関係性を大胆に断言してください。

【絶対ルール】
- 回答の言葉をそのまま使うのは禁止。回答は手がかりに過ぎない
- 「〜かもしれません」は絶対に使わない。すべて断定
- 「諦めた」という言葉の裏にある本当の状態を、本人より正確に言語化する
- 「なんでそこまで知ってるの」と思わせる踏み込み方をする
- 責めず、慰めず、ただ「これがあなたの状態です」と事実として突きつける
- 読んで「怖い」と「嬉しい」が同時に来るような精度で

【回答内容】
${qaText}

【タイプ一覧】
- eien_geneki型: 永遠現役型（諦めたと言いながら、その夢はまったく諦められていない）
- kawari_motome型: 代替追求型（夢の形を変えながら、本質的に同じものを追い続けている）
- henkei_jitsugen型: 変形実現型（夢の形は変わったが、その本質はすでに叶っている）
- hikigane_machi型: 引き金待ち型（準備は整っているが、「条件が揃えば」を繰り返して動かない）
- akirame_furi型: 諦めたふり型（「もう諦めた」という言葉が最も嘘くさい状態）

【出力形式】
以下のJSONのみを返してください。

{
  "type": "（タイプID）",
  "diagnosis": "（3〜4文。「なりたかった自分」と今の自分の関係性を解剖する。「あなたの理想の自分は〜という状態にある」という断言口調で。回答の言葉を使わず、その人の本当の状態を暴く）",
  "innerVoiceQuote": "（「なりたかった自分」が今のあなたに語りかけるとしたら言いそうなセリフ。本人が一番聞きたくて、一番聞きたくない内容で。改行は\\nで2〜3行）",
  "shareText": "（「心臓に刺さる」と思わせる一言。理想の自分との距離を断言。絵文字含めて40字以内）"
}`,
        },
      ],
    })

    const text = response.content[0].type === 'text' ? response.content[0].text : ''
    const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/)
    const jsonText = jsonMatch ? jsonMatch[1].trim() : text.trim()
    const result = JSON.parse(jsonText) as {
      type: IdealSelfType
      diagnosis: string
      innerVoiceQuote: string
      shareText: string
    }

    return NextResponse.json({ success: true, data: result })
  } catch (e) {
    console.error('[diagnose-ideal-self]', e)
    return NextResponse.json(
      { success: false, error: '診断に失敗しました。もう一度お試しください。' },
      { status: 500 }
    )
  }
}
