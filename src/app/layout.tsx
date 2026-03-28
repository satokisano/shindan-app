import type { Metadata } from 'next'
import '@fontsource/noto-sans-jp'
import './globals.css'

export const metadata: Metadata = {
  title: 'あなたの脳内診断',
  description: 'AIがあなたの言葉を読んで、脳内の声のタイプを本気で診断します',
  openGraph: {
    title: 'あなたの脳内の声タイプ診断',
    description: 'AIがあなたの言葉を読んで本気で分析。選択肢なし、テキストで答えるだけ。',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4007086599379329"
          crossOrigin="anonymous"
        />
      </head>
      <body
        style={{ fontFamily: "'Noto Sans JP', sans-serif" }}
        className="antialiased min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50"
      >
        {children}
      </body>
    </html>
  )
}
