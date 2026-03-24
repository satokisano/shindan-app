export const QUESTIONS = [
  {
    id: 1,
    question: '昨夜、寝る直前に頭の中で何が始まりましたか？',
    placeholder: '「明日のこと考えてたら止まらなくなった」「謎の妄想が始まった」など、思ったままに書いてください',
  },
  {
    id: 2,
    question: '誰かと話した後、一人になったとき脳内で何が起きますか？',
    placeholder: '「あの発言大丈夫だったかな」「もっとこう言えばよかった」など',
  },
  {
    id: 3,
    question: '失敗したとき、最初に頭に浮かぶのはどんな言葉や場面ですか？',
    placeholder: '自分を責める？次の作戦を考える？全部忘れようとする？',
  },
  {
    id: 4,
    question: '何もしていない暇な時間、脳内で勝手に何が始まりますか？',
    placeholder: '妄想？心配？過去の記憶？まったく別のこと？',
  },
  {
    id: 5,
    question: '誰かに褒められたとき、心の中で最初に思うことは？',
    placeholder: '素直に嬉しい？「本当に？」と疑う？照れ隠しで否定する？',
  },
  {
    id: 6,
    question: '明日大事なことがあるとき、今夜の脳内はどんな状態になりますか？',
    placeholder: 'シミュレーション開始？最悪の展開を想像？なぜか別のことを考える？',
  },
  {
    id: 7,
    question: 'あなたの脳内の声に名前やキャラクターをつけるとしたら？',
    placeholder: '「過去ばかり掘り起こす考古学者」「全力で逃げる係」など、自由な発想で',
  },
]

export type ResultType =
  | 'shinpai_banchou'
  | 'moso_seizoki'
  | 'jiko_hihan_iinkai'
  | 'kanjou_jikkyou_announcer'
  | 'genjitsu_tosou_dj'

export const RESULT_TYPES: Record<
  ResultType,
  {
    name: string
    emoji: string
    color: string
    bgGradient: string
    tagline: string
    baseDescription: string
  }
> = {
  shinpai_banchou: {
    name: '心配番長',
    emoji: '😰',
    color: '#5B8AD4',
    bgGradient: 'from-blue-100 via-indigo-50 to-purple-100',
    tagline: '常に最悪のシナリオを想定し続ける、脳内マネージャー',
    baseDescription:
      'あなたの脳内には、24時間365日フル稼働のリスク管理部門があります。「でも、もし○○だったら…」が口癖のこの声は、あなたを守ろうとしているのです。ただ、少し働きすぎているかもしれません。',
  },
  moso_seizoki: {
    name: '妄想製造機',
    emoji: '✨',
    color: '#9B6DC9',
    bgGradient: 'from-purple-100 via-pink-50 to-indigo-100',
    tagline: '気づいたら脳内で映画1本撮ってる、最強のクリエイター',
    baseDescription:
      'あなたの脳は現実から0.3秒で別世界へ飛べる特殊能力を持っています。誰かと話しながら並行して脳内ドラマが展開されているはず。この豊かな想像力は、使い方次第で最大の武器になります。',
  },
  jiko_hihan_iinkai: {
    name: '自己批判委員会',
    emoji: '📋',
    color: '#C96D6D',
    bgGradient: 'from-red-100 via-rose-50 to-orange-100',
    tagline: '全会一致で「あなたが悪い」を議決し続ける、厳しすぎる審判',
    baseDescription:
      'あなたの脳内では、日々委員会が開催されています。議題はいつも「今日の自分の失態について」。厳しい目を持っているということは、それだけ高い基準を自分に課しているということ。その真剣さは本物です。',
  },
  kanjou_jikkyou_announcer: {
    name: '感情実況アナウンサー',
    emoji: '🎙️',
    color: '#4BAD85',
    bgGradient: 'from-green-100 via-teal-50 to-emerald-100',
    tagline: '自分の感情を逐一中継してしまう、ライブ感あふれるタイプ',
    baseDescription:
      'あなたの脳内では、感情のひとつひとつが実況付きで展開されています。「今まさに傷ついています！」「喜びの波が来ました！」——その豊かな感受性は、人の気持ちを敏感に察知できる力でもあります。',
  },
  genjitsu_tosou_dj: {
    name: '現実逃避DJ',
    emoji: '🎧',
    color: '#C9A83C',
    bgGradient: 'from-yellow-100 via-amber-50 to-orange-100',
    tagline: '嫌なことが来た瞬間、即座に別の思考に切り替える達人',
    baseDescription:
      'あなたの脳には、不快な感情を検知すると自動で別のトラックに切り替えるシステムが搭載されています。このサバイバル能力のおかげで今日も生き延びているわけですが、たまには直面することも大事かもしれません。',
  },
}
