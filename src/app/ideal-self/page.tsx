'use client'

import { useState } from 'react'
import { IDEAL_QUESTIONS, IDEAL_SELF_TYPES, IdealSelfType } from '@/data/ideal-self'
import { ArrowLeft, ArrowRight, Sparkles, Share2, RotateCcw } from 'lucide-react'
import Link from 'next/link'

type Phase = 'quiz' | 'loading' | 'result'

interface DiagnoseResult {
  type: IdealSelfType
  diagnosis: string
  innerVoiceQuote: string
  shareText: string
}

const LOADING_MESSAGES = [
  'あなたの言葉を読んでいます…',
  'なりたかった自分を探しています…',
  '理想と現実の距離を測っています…',
  'もうすぐ結果が出ます…',
]

const QUESTION_EMOJIS = ['🌱', '✨', '🔀', '💫', '😤', '🌑', '📏']

export default function IdealSelfPage() {
  const [phase, setPhase] = useState<Phase>('quiz')
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [result, setResult] = useState<DiagnoseResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loadingMsg, setLoadingMsg] = useState(0)

  const currentQuestion = IDEAL_QUESTIONS[currentQ]
  const isLast = currentQ === IDEAL_QUESTIONS.length - 1
  const currentAnswer = answers[currentQuestion.id] ?? ''
  const canNext = currentAnswer.trim().length >= 5

  function handleNext() {
    if (isLast) {
      submitDiagnosis()
    } else {
      setCurrentQ((q) => q + 1)
    }
  }

  function handleBack() {
    if (currentQ > 0) setCurrentQ((q) => q - 1)
  }

  async function submitDiagnosis() {
    setPhase('loading')
    setError(null)

    let msgIdx = 0
    const interval = setInterval(() => {
      msgIdx = (msgIdx + 1) % LOADING_MESSAGES.length
      setLoadingMsg(msgIdx)
    }, 2000)

    try {
      const res = await fetch('/api/diagnose-ideal-self', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers }),
      })
      const data = await res.json()
      if (!data.success) throw new Error(data.error)
      setResult(data.data)
      setPhase('result')
    } catch (e) {
      setError(e instanceof Error ? e.message : '診断に失敗しました')
      setPhase('quiz')
    } finally {
      clearInterval(interval)
    }
  }

  function handleShare() {
    if (!result) return
    const typeInfo = IDEAL_SELF_TYPES[result.type]
    const text = `${typeInfo.emoji} なりたかった自分タイプ診断：「${typeInfo.name}」\n\n${result.shareText}\n\n#なりたかった自分診断`
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`
    window.open(url, '_blank')
  }

  function handleRetry() {
    setPhase('quiz')
    setCurrentQ(0)
    setAnswers({})
    setResult(null)
  }

  if (phase === 'loading') {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-4">
        <div className="text-center space-y-6">
          <div className="relative w-20 h-20 mx-auto">
            <div className="absolute inset-0 rounded-full border-4 border-teal-200 animate-ping" />
            <div className="absolute inset-2 rounded-full border-4 border-teal-400 animate-spin border-t-transparent" />
            <div className="absolute inset-0 flex items-center justify-center text-2xl">🌙</div>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-teal-700 animate-pulse">
              {LOADING_MESSAGES[loadingMsg]}
            </p>
            <p className="text-xs text-gray-400">AIがあなたの理想と現実を読み解いています</p>
          </div>
        </div>
      </main>
    )
  }

  if (phase === 'result' && result) {
    const typeInfo = IDEAL_SELF_TYPES[result.type]
    return (
      <main className="min-h-screen flex flex-col items-center justify-start px-4 py-12">
        <div className="max-w-md w-full space-y-6">
          <div className={`rounded-3xl bg-gradient-to-br ${typeInfo.bgGradient} p-8 shadow-sm`}>
            <div className="text-center space-y-3 mb-6">
              <div className="text-6xl">{typeInfo.emoji}</div>
              <div>
                <p className="text-xs text-gray-500 mb-1">あなたの「なりたかった自分」タイプは</p>
                <h1 className="text-3xl font-bold text-gray-800">{typeInfo.name}</h1>
                <p className="text-sm text-gray-600 mt-1 leading-relaxed">{typeInfo.tagline}</p>
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 space-y-4">
              <div>
                <p className="text-xs font-medium text-gray-500 mb-2 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> AIによる理想自己の解剖
                </p>
                <p className="text-sm text-gray-700 leading-relaxed">{result.diagnosis}</p>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <p className="text-xs font-medium text-gray-500 mb-2">🌙 なりたかった自分が今のあなたに言うとしたら</p>
                <div className="bg-gray-50 rounded-xl p-4">
                  {result.innerVoiceQuote.split('\\n').map((line, i) => (
                    <p key={i} className="text-sm text-gray-700 italic leading-relaxed">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleShare}
              className="flex-1 flex items-center justify-center gap-2 bg-black text-white rounded-2xl py-4 text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              <Share2 className="w-4 h-4" />
              Xでシェア
            </button>
            <button
              onClick={handleRetry}
              className="flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-600 rounded-2xl px-5 py-4 text-sm hover:bg-gray-50 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              もう一度
            </button>
          </div>

          <Link href="/" className="block text-center text-xs text-gray-400 hover:text-gray-600 transition-colors">
            他の診断を見る
          </Link>
        </div>
      </main>
    )
  }

  const progress = (currentQ / IDEAL_QUESTIONS.length) * 100

  return (
    <main className="min-h-screen flex flex-col items-center justify-start px-4 py-10">
      <div className="max-w-md w-full space-y-6">
        <div className="flex items-center gap-3">
          <Link href="/" className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <ArrowLeft className="w-4 h-4 text-gray-500" />
          </Link>
          <div className="flex-1">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-gray-400">
                {currentQ + 1} / {IDEAL_QUESTIONS.length}
              </span>
              <span className="text-xs text-gray-400">
                なりたかった自分タイプ診断
              </span>
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-7 shadow-sm border border-gray-50 space-y-5">
          <div className="space-y-2">
            <div className="text-2xl">{QUESTION_EMOJIS[currentQ]}</div>
            <h2 className="text-lg font-bold text-gray-800 leading-snug">
              {currentQuestion.question}
            </h2>
          </div>

          <textarea
            value={currentAnswer}
            onChange={(e) =>
              setAnswers({ ...answers, [currentQuestion.id]: e.target.value })
            }
            placeholder={currentQuestion.placeholder}
            rows={4}
            className="w-full resize-none rounded-2xl bg-gray-50 border-0 p-4 text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-200 leading-relaxed transition-all"
          />

          {currentAnswer.trim().length > 0 && currentAnswer.trim().length < 5 && (
            <p className="text-xs text-gray-400">もう少し教えてください</p>
          )}

          {error && (
            <p className="text-xs text-red-500 bg-red-50 rounded-xl p-3">{error}</p>
          )}
        </div>

        <div className="flex gap-3">
          {currentQ > 0 && (
            <button
              onClick={handleBack}
              className="flex items-center gap-2 bg-white border border-gray-200 text-gray-500 rounded-2xl px-5 py-4 text-sm hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              前へ
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={!canNext}
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-2xl py-4 text-sm font-medium disabled:opacity-30 disabled:cursor-not-allowed hover:from-teal-600 hover:to-emerald-600 transition-all shadow-sm"
          >
            {isLast ? (
              <>
                <Sparkles className="w-4 h-4" />
                AIに診断してもらう
              </>
            ) : (
              <>
                次へ
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        <p className="text-center text-xs text-gray-300">
          回答は送信後に削除されます
        </p>
      </div>
    </main>
  )
}
