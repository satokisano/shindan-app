export const IDEAL_QUESTIONS = [
  {
    id: 1,
    question: '子どもの頃、「大人になったらこうなりたい」と思っていたことを教えてください',
    placeholder: '職業でも性格でも生き方でも。「忘れてた」と思うものでも',
  },
  {
    id: 2,
    question: '10代のころ、密かに憧れていた人や生き方はありましたか？',
    placeholder: '有名人でも、身近な人でも。「あんなふうになりたかった」という感覚',
  },
  {
    id: 3,
    question: '「あのとき別の選択をしていたら、今の自分は違っていた」と思う場面は？',
    placeholder: '進路、仕事、人間関係、やめてしまったこと……',
  },
  {
    id: 4,
    question: '今でも「本当はやってみたかった」と思っていることはありますか？',
    placeholder: '「もう遅い」と思っているものでも。正直に',
  },
  {
    id: 5,
    question: '他人の活躍や生き方を見て、「羨ましい」より「悔しい」と感じることはありますか？',
    placeholder: 'どんな人に、どんな部分で。「自分でもできたかも」と感じるものなら特に',
  },
  {
    id: 6,
    question: '「もう諦めた」と言いながら、実は完全には手放せていないことは？',
    placeholder: '夢、可能性、才能……「諦めた」と口では言えるけど心では？',
  },
  {
    id: 7,
    question: '今の自分と「なりたかった自分」の距離を、言葉で表すとどうなりますか？',
    placeholder: '「ほぼ同じ」「全然違う」「形は違うけど本質は同じかも」など、感覚で',
  },
]

export type IdealSelfType =
  | 'eien_geneki型'
  | 'kawari_motome型'
  | 'henkei_jitsugen型'
  | 'hikigane_machi型'
  | 'akirame_furi型'

export const IDEAL_SELF_TYPES: Record<
  IdealSelfType,
  {
    name: string
    emoji: string
    color: string
    bgGradient: string
    tagline: string
    baseDescription: string
  }
> = {
  eien_geneki型: {
    name: '永遠現役型理想自己',
    emoji: '🔥',
    color: '#E05A3A',
    bgGradient: 'from-red-100 via-orange-50 to-amber-100',
    tagline: '諦めたつもりが、全然諦めていなかった',
    baseDescription:
      'あなたの「なりたかった自分」は、一度も現役を退いていません。表に出さないだけで、その夢はずっと胸の奥でくすぶり続けています。「もういい」と口にしたとき、それは諦めたのではなく保留にしただけです。あなたの中の情熱は消えておらず、引火するきっかけを静かに待っています。',
  },
  kawari_motome型: {
    name: '代替追求型理想自己',
    emoji: '🌿',
    color: '#5B9E6E',
    bgGradient: 'from-green-100 via-teal-50 to-emerald-100',
    tagline: '形を変えながら、ずっと同じものを追い続けている',
    baseDescription:
      'あなたは「なりたかった自分」を直接追うのをやめましたが、その本質は別の形で求め続けています。夢そのものではなく、その夢が与えてくれるはずだった何か——承認、自由、表現、つながり——をルートを変えて探しています。遠回りに見えて、実は最初からぶれていません。',
  },
  henkei_jitsugen型: {
    name: '変形実現型理想自己',
    emoji: '🦋',
    color: '#7B9ED9',
    bgGradient: 'from-blue-100 via-indigo-50 to-violet-100',
    tagline: '夢の形が変わっただけで、本質はもう叶っている',
    baseDescription:
      'あなたの「なりたかった自分」は、すでに別の形で実現しています。あなたはそれに気づいていないか、「これじゃない」と受け取れていない。子どもの頃の夢のビジョンと現在の姿がズレているように見えるだけで、その根っこにある欲求——誰かを助けたい、何かを作りたい、自分で決めたい——はすでに満たされています。',
  },
  hikigane_machi型: {
    name: '引き金待ち型理想自己',
    emoji: '⚡',
    color: '#C9A03A',
    bgGradient: 'from-yellow-100 via-amber-50 to-lime-100',
    tagline: '条件が揃えばいつでも動ける。その「条件」がずっと揃わない',
    baseDescription:
      'あなたの「なりたかった自分」に向けたエンジンはかかっています。ただ、発車の条件として「もう少し時間ができたら」「もう少し準備ができたら」という条件を追加し続けています。準備は十分です。条件を作っているのはあなた自身です。引き金を引かない選択をしているのも、あなたです。',
  },
  akirame_furi型: {
    name: '諦めたふり型理想自己',
    emoji: '🌑',
    color: '#6B5B8C',
    bgGradient: 'from-purple-100 via-fuchsia-50 to-violet-100',
    tagline: '「もう諦めた」という言葉が、一番嘘くさい',
    baseDescription:
      'あなたは「もう諦めた」と言葉では言えます。でも、その言い方が少し早すぎます。諦めた人は、諦めたことについてここまで考えません。悔しさを感じません。他人の活躍にここまで反応しません。あなたが諦めたのは「叶う確率の計算」であって、「叶えたいという気持ち」ではありません。それは全然、別の話です。',
  },
}
