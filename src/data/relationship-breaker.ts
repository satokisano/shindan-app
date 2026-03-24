export const BREAKER_QUESTIONS = [
  {
    id: 1,
    question: '「また同じことをやってしまった」と思った人間関係の失敗を教えてください',
    placeholder: '繰り返しパターンに気づいていること。「また距離を置いた」「また爆発した」など',
  },
  {
    id: 2,
    question: '関係が壊れるとき、最初のきっかけはたいてい何ですか？',
    placeholder: '相手の言動？自分の反応？なんとなく？気づいたら終わってた？',
  },
  {
    id: 3,
    question: '「深くなりそう」と感じたとき、あなたはどう反応しますか？',
    placeholder: '嬉しい？怖い？試したくなる？距離を置きたくなる？',
  },
  {
    id: 4,
    question: '相手が離れていったとき、後から「あれが原因だったかも」と気づいたことは？',
    placeholder: '自分のクセ、言葉のクセ、行動のパターンなど',
  },
  {
    id: 5,
    question: '人に期待して、裏切られたと感じた経験を教えてください',
    placeholder: '相手が悪かったのか、自分の期待が大きすぎたのか、正直に',
  },
  {
    id: 6,
    question: '自分から連絡を絶ったり、関係を終わらせたりしたことはありますか？',
    placeholder: 'なぜそうしたか。何が嫌だったのか、何が怖かったのか',
  },
  {
    id: 7,
    question: '「自分といると相手が疲れるかもしれない」と思ったことはありますか？',
    placeholder: 'そのとき、自分のどんな面が気になっていましたか',
  },
]

export type BreakerType =
  | 'jibun_hanareru型'
  | 'shikenbari型'
  | 'fade_out型'
  | 'kaitai_kubo型'
  | 'shinrai_fukano型'

export const BREAKER_TYPES: Record<
  BreakerType,
  {
    name: string
    emoji: string
    color: string
    bgGradient: string
    tagline: string
    baseDescription: string
  }
> = {
  jibun_hanareru型: {
    name: '先手逃亡型',
    emoji: '🏃',
    color: '#E07B5A',
    bgGradient: 'from-orange-100 via-red-50 to-rose-100',
    tagline: '深くなる前に、自分から壊す。傷つく前に逃げる',
    baseDescription:
      'あなたは関係が深まりそうになると、先に壊します。傷つけられる前に、自分から距離を取る——これがあなたの無意識の防衛機制です。相手はそれを「突然冷たくなった」と感じています。あなたにとって逃げることは合理的な選択に見えますが、実は自分が怖いと思っているのではなく、大切にしたいと思っているからこそ起きています。',
  },
  shikenbari型: {
    name: '試し行動型',
    emoji: '🎭',
    color: '#9B7FB6',
    bgGradient: 'from-purple-100 via-violet-50 to-indigo-100',
    tagline: '「本当に大丈夫？」を確かめ続けた結果、相手が折れる',
    baseDescription:
      'あなたは無意識に相手を「試し」ています。わざと返事を遅らせる、わがままを言う、不機嫌をぶつける——それは意地悪ではなく、「それでも離れない？」という確認作業です。問題は、合格基準を教えないまま試験を続けることです。相手はいつ疲れて答案を白紙にして帰っても不思議ではありません。',
  },
  fade_out型: {
    name: '静かな消滅型',
    emoji: '🌫️',
    color: '#6B9EB2',
    bgGradient: 'from-slate-100 via-gray-50 to-zinc-100',
    tagline: 'さよならも言わずに、気づいたらいなくなっている',
    baseDescription:
      'あなたの関係の終わり方は、静かです。説明もなく、怒りもなく、ただフェードアウトする。相手からすれば突然消えたように見えます。あなたの中では長い時間をかけて決断しているのに、相手にはその過程が見えない。「言えばよかった」と後から思うのに、次もまた同じことをします。言葉にすることへの苦手意識が、関係を消していきます。',
  },
  kaitai_kubo型: {
    name: '過大期待崩壊型',
    emoji: '🏗️',
    color: '#C97A3A',
    bgGradient: 'from-amber-100 via-yellow-50 to-lime-100',
    tagline: '完璧な関係を期待して、現実の相手に失望し続ける',
    baseDescription:
      'あなたは関係に対して、最初から「こうであるべき」という設計図を持っています。その設計図は精巧で美しいが、現実の人間に合わないサイズで作られています。相手が設計図から外れるたびに失望し、それが積み重なって関係が崩れていく。あなたを壊しているのは相手の不誠実ではなく、誰も知らない設計図の存在です。',
  },
  shinrai_fukano型: {
    name: '信頼障壁型',
    emoji: '🔐',
    color: '#4A7FC1',
    bgGradient: 'from-blue-100 via-sky-50 to-indigo-100',
    tagline: '心を開きかけたところで、鍵を閉める',
    baseDescription:
      'あなたは人を信頼したいと強く思っています。でも、信頼しようとした瞬間に何かが作動し、鍵をかけます。その「何か」は過去の経験から学習した自己防衛プログラムです。一度痛い目に遭うと、二度と同じ轍を踏まないためにプログラムが更新される。結果、あなたの心の扉を開けられる人間は存在しないレベルまで鍵が増えていきます。',
  },
}
