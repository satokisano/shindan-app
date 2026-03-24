export const OBSESSION_QUESTIONS = [
  {
    id: 1,
    question: '捨てようとして捨てられないもの・こと・感情を教えてください',
    placeholder: '物でも、人への気持ちでも、記憶でも。「もういいと思ってるのに」というものでも',
  },
  {
    id: 2,
    question: '誰かに「それはもう終わったことだよ」と言われたのに、まだ引きずっていることは？',
    placeholder: '過去の失敗、終わった関係、言われた一言……正直に',
  },
  {
    id: 3,
    question: '「なぜこんなに気になるんだろう」と自分でも不思議に思ったことはありますか？',
    placeholder: '他人の評価、特定の人、昔の自分の選択など',
  },
  {
    id: 4,
    question: '「本当はもっと〇〇されたかった／認められたかった」と思う場面を教えてください',
    placeholder: '家族、職場、恋愛、学校……どこでもOK。当時の気持ちを正直に',
  },
  {
    id: 5,
    question: 'ふとした瞬間に「あのときこうしていれば」と思い出す出来事は？',
    placeholder: '後悔に近いもの、選ばなかった選択肢、言えなかった言葉など',
  },
  {
    id: 6,
    question: '誰かに話すとき、意識的に「ここは言わないでおこう」としていることはありますか？',
    placeholder: 'なぜ言えない？恥ずかしい？重い？それとも笑われそう？',
  },
  {
    id: 7,
    question: 'あなたの執着を一言で表すとしたら、何だと思いますか？',
    placeholder: '「未練」「怒り」「証明したい気持ち」「ある人への感情」など、思ったまま',
  },
]

export type ObsessionType =
  | 'kako_jibun型'
  | 'shoumei_yokkyuu型'
  | 'kansei_mihatasu型'
  | 'hito_zouri型'
  | 'risou_jiko型'

export const OBSESSION_TYPES: Record<
  ObsessionType,
  {
    name: string
    emoji: string
    color: string
    bgGradient: string
    tagline: string
    baseDescription: string
  }
> = {
  kako_jibun型: {
    name: '過去の自分への執着型',
    emoji: '🪞',
    color: '#9B7FB6',
    bgGradient: 'from-violet-100 via-purple-50 to-fuchsia-100',
    tagline: 'あのころの自分がまだ、鏡の中に住んでいる',
    baseDescription:
      'あなたが執着しているのは、過去のある時点の「自分」です。輝いていたあの頃、まだ何者にでもなれると思っていたあの頃——その自分を手放せないまま今を生きています。現在の自分を評価するとき、無意識に「あのころの基準」を使っています。それが息苦しさの正体です。',
  },
  shoumei_yokkyuu型: {
    name: '承認渇望執着型',
    emoji: '🕯️',
    color: '#C97A3A',
    bgGradient: 'from-amber-100 via-orange-50 to-yellow-100',
    tagline: '認められなかったあの瞬間が、今もずっと燃えている',
    baseDescription:
      'あなたの執着の根っこには「証明できなかった」という感覚があります。特定の人に、特定の場面で、あなたの価値を認められなかった——その未完の承認要求が、今の行動のエンジンになっています。頑張り続けるのはあなたの強みですが、その燃料は古い傷です。',
  },
  kansei_mihatasu型: {
    name: '完成未果執着型',
    emoji: '🧩',
    color: '#4A9EC9',
    bgGradient: 'from-sky-100 via-blue-50 to-cyan-100',
    tagline: '最後のピースが足りないまま、何年も経っている',
    baseDescription:
      'あなたは「終わらせられなかったこと」に縛られています。中断したこと、言いかけた言葉、途中で諦めた計画——完了していないものが頭のどこかに常駐し続けています。完璧主義とは少し違う。終わらせることへの恐怖と、終わらせられなかった後悔が混在しています。',
  },
  hito_zouri型: {
    name: '人への執着型',
    emoji: '🧵',
    color: '#C95B7A',
    bgGradient: 'from-rose-100 via-pink-50 to-red-100',
    tagline: 'もう繋がっていない誰かへの糸が、まだ切れていない',
    baseDescription:
      'あなたの執着の対象は、特定の「人」です。もう会えない人、関係が終わった人、存在を忘れようとしている人——その人への感情がきれいに消化できていません。怒りでも未練でも罪悪感でも、まだ名前をつけられていない感情として、あなたの中で生き続けています。',
  },
  risou_jiko型: {
    name: '理想自己執着型',
    emoji: '🌙',
    color: '#5B9E6E',
    bgGradient: 'from-teal-100 via-emerald-50 to-green-100',
    tagline: 'なれなかった自分の幻が、ずっとそこに立っている',
    baseDescription:
      'あなたが執着しているのは「なれたはずの自分」です。別の選択をしていた自分、違う道に進んでいた自分——その幻のもう一人の自分と、無意識に今の自分を比べ続けています。現実の自分を認めたくない理由は、理想の自分を諦めていないからです。それは弱さではなく、手放せない可能性への愛です。',
  },
}
