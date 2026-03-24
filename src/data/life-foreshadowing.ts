export const FORESHADOWING_QUESTIONS = [
  {
    id: 1,
    question: 'あなたの人生で「あのときの経験が、今に繋がってた」と気づいた瞬間を教えてください',
    placeholder: '小さいことでも大きいことでも。「あのバイトが」「あの失敗が」など',
  },
  {
    id: 2,
    question: '昔の自分が今のあなたを見たら、何と言うと思いますか？',
    placeholder: '驚く？呆れる？予想通り？「そうじゃないよ」って言いそう？',
  },
  {
    id: 3,
    question: '周りの人から「実はずっとそう思ってた」と言われたことはありますか？',
    placeholder: 'どんな内容でしたか。本人だけ気づいてなかったこと、でも可',
  },
  {
    id: 4,
    question: '「いつかやる」と思いながら、まだやっていないことは何ですか？',
    placeholder: '正直に。何年も放置してるものでもOK',
  },
  {
    id: 5,
    question: '自分の人生を小説にするとしたら、今は何章目で、この章のタイトルは何ですか？',
    placeholder: '「第3章：迷走期」「終章の手前」「プロローグがまだ終わってない」など自由に',
  },
  {
    id: 6,
    question: '未来の自分への伏線として、今あなたが（密かに）仕込んでいることはありますか？',
    placeholder: 'なければ「特にない」でも構いません。その答え自体が伏線になります',
  },
  {
    id: 7,
    question: 'あなたの人生に「回収されないまま終わりそうな伏線」があるとしたら、何ですか？',
    placeholder: '夢、関係性、やりかけのこと、言えなかった言葉……何でも',
  },
]

export type ForeshadowingType =
  | 'josho_放置型'
  | 'kaishuu_sarenai型'
  | 'chokuzen_kaishuu型'
  | 'reader_barebarre型'
  | 'dondengaeshi型'

export const FORESHADOWING_TYPES: Record<
  ForeshadowingType,
  {
    name: string
    emoji: string
    color: string
    bgGradient: string
    tagline: string
    baseDescription: string
  }
> = {
  josho_放置型: {
    name: '序盤放置型伏線',
    emoji: '🌱',
    color: '#5B9E6E',
    bgGradient: 'from-green-100 via-emerald-50 to-teal-100',
    tagline: '序盤から全部張ってあった。気づいてなかったのは自分だけ',
    baseDescription:
      'あなたの人生の伏線は、驚くほど最初から仕込まれています。子どもの頃の原体験、忘れかけていた選択、何気なく踏み込んだ場所——それらが実は全部、今の自分に向けて張られていた伏線でした。読み返すと「なんで気づかなかったんだろう」という伏線の宝庫です。',
  },
  kaishuu_sarenai型: {
    name: '未回収伏線',
    emoji: '🕸️',
    color: '#8B6FBE',
    bgGradient: 'from-purple-100 via-violet-50 to-indigo-100',
    tagline: '無数の伏線が宙に浮いたまま、物語は進んでいる',
    baseDescription:
      'あなたの人生には、誰も回収していない伏線が大量に眠っています。やりかけのこと、言いかけた言葉、踏み出しかけた一歩——作者（あなた）が意図的に忘れているのか、それとも回収のタイミングを待っているのか。どちらにせよ、その伏線はまだ死んでいません。',
  },
  chokuzen_kaishuu型: {
    name: '直前回収型伏線',
    emoji: '⏳',
    color: '#C97A3A',
    bgGradient: 'from-orange-100 via-amber-50 to-yellow-100',
    tagline: 'ずっと動かなかった。でも最後の最後で全部繋がるタイプ',
    baseDescription:
      'あなたの伏線の回収タイミングは、いつも「ギリギリ」です。長い間何も起きていないように見えて、最終章に差し掛かったとき、突然すべてが繋がる——そういう物語の構造をしています。じっくり時間をかけて、確実に回収する。焦らないことが最大の強みです。',
  },
  reader_barebarre型: {
    name: '読者バレバレ型伏線',
    emoji: '🔍',
    color: '#4A9EC9',
    bgGradient: 'from-sky-100 via-blue-50 to-cyan-100',
    tagline: '本人だけが気づいていない。周りには全部見えている',
    baseDescription:
      'あなたの伏線は、周囲の人には丸見えです。「あなたって絶対こうなると思ってた」「やっぱりね」と言われた経験があるはず。本人が一番驚いている展開を、周りは全員予測していた——そういうタイプの物語を生きています。鈍感なのではなく、自分への観察眼だけが甘い。',
  },
  dondengaeshi型: {
    name: 'どんでん返し型伏線',
    emoji: '🌀',
    color: '#C95B7A',
    bgGradient: 'from-rose-100 via-pink-50 to-fuchsia-100',
    tagline: '後から全部が繋がる。その瞬間まで誰にも読めない',
    baseDescription:
      'あなたの人生は、読了後に「あ、全部繋がってた」と気づく構造になっています。一見バラバラに見える経験、唐突に思える選択、関係なさそうな出会い——それが最後に一本の線になる。読んでいる途中には絶対に予測できない、複雑な伏線の張り方をしています。',
  },
}
