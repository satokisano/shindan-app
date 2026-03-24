import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'

const DIAGNOSTICS = [
  {
    href: '/brain-voice',
    emoji: '😰',
    title: 'あなたの脳内うるさい声タイプ診断',
    description: '7問のテキスト回答をAIが分析。選択肢ではなくあなた自身の言葉で診断します。',
    color: 'border-purple-100',
    badge: 'text-purple-500 bg-purple-50',
    arrow: 'text-purple-500',
    hover: 'from-purple-50/0 to-purple-50/30',
  },
  {
    href: '/life-foreshadowing',
    emoji: '📖',
    title: 'あなたの人生の伏線タイプ診断',
    description: 'あなたの人生を「物語の伏線」として解釈する、文学的な診断。',
    color: 'border-amber-100',
    badge: 'text-amber-500 bg-amber-50',
    arrow: 'text-amber-500',
    hover: 'from-amber-50/0 to-amber-50/30',
  },
  {
    href: '/hidden-obsession',
    emoji: '🪞',
    title: 'あなたの「人に言えない執着」タイプ診断',
    description: '捨てられないもの、引きずる感情、その正体をAIが暴きます。',
    color: 'border-fuchsia-100',
    badge: 'text-fuchsia-500 bg-fuchsia-50',
    arrow: 'text-fuchsia-500',
    hover: 'from-fuchsia-50/0 to-fuchsia-50/30',
  },
  {
    href: '/relationship-breaker',
    emoji: '🎭',
    title: 'あなたの「人間関係の壊し方」タイプ診断',
    description: '繰り返す関係のパターン。無意識の「壊し方」をAIが断言します。',
    color: 'border-slate-100',
    badge: 'text-slate-500 bg-slate-50',
    arrow: 'text-slate-500',
    hover: 'from-slate-50/0 to-slate-50/30',
  },
  {
    href: '/ideal-self',
    emoji: '🌙',
    title: 'あなたの「なりたかった自分」タイプ診断',
    description: '捨てきれていない理想の自分との距離を、AIが正直に言語化します。',
    color: 'border-teal-100',
    badge: 'text-teal-500 bg-teal-50',
    arrow: 'text-teal-500',
    hover: 'from-teal-50/0 to-teal-50/30',
  },
]

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-start px-4 py-16">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="space-y-3">
          <div className="text-5xl">🔍</div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-800">
            AI本気診断
          </h1>
          <p className="text-sm text-gray-500">
            あなたの言葉をAIが読んで、本当のことを言います
          </p>
        </div>

        <div className="space-y-3">
          {DIAGNOSTICS.map((d) => (
            <Link key={d.href} href={d.href} className="block">
              <div className={`group relative overflow-hidden rounded-2xl bg-white border ${d.color} p-6 text-left shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5`}>
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{d.emoji}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs font-medium ${d.badge} px-2 py-0.5 rounded-full`}>
                        NEW
                      </span>
                    </div>
                    <h2 className="font-bold text-gray-800 mb-1">{d.title}</h2>
                    <p className="text-xs text-gray-500 leading-relaxed">{d.description}</p>
                    <div className={`mt-3 flex items-center gap-1 text-xs ${d.arrow} font-medium`}>
                      診断する
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
                <div className={`absolute inset-0 bg-gradient-to-r ${d.hover} opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl`} />
              </div>
            </Link>
          ))}
        </div>

        <p className="text-xs text-gray-400 flex items-center justify-center gap-1">
          <Sparkles className="w-3 h-3" />
          Claude AIによる本気の分析
        </p>
      </div>
    </main>
  )
}
