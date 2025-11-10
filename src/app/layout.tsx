import type { Metadata } from 'next'
import localFont from 'next/font/local'

import { Header } from '@/shared/components'

import './globals.css'

const pretendard = localFont({
  src: '../../public/fonts/pretendard/PretendardVariable.woff2',
  display: 'swap',
  weight: '100 900',
  variable: '--font-pretendard',
  fallback: ['system-ui', 'Helvetica', 'Arial', 'sans-serif'],
})

const d2coding = localFont({
  src: [
    {
      path: '../../public/fonts/d2coding/D2Coding-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/d2coding/D2Coding-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-d2coding',
  fallback: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
})

export const metadata: Metadata = {
  title: 'TikiTok',
  description: 'TikiTok으로 나의 시간 사용 습관을 시각화하고, 데이터 기반으로 하루를 개선해보세요.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" className={`${pretendard.variable} ${d2coding.variable}`}>
      <body className="flex min-h-screen flex-col antialiased">
        <Header />
        <div className="flex flex-1 flex-col">{children}</div>
      </body>
    </html>
  )
}
