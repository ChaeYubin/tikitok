import './globals.css'
import '@mantine/core/styles.css'

import { ColorSchemeScript, mantineHtmlProps } from '@mantine/core'
import type { Metadata } from 'next'

import { d2coding, DesignSystemProvider, pretendard } from '@/lib/design-system-provider'
import { Header } from '@/shared/components'

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
    <html lang="ko" className={`${pretendard.variable} ${d2coding.variable}`} {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body className="flex h-screen flex-col antialiased">
        <DesignSystemProvider>
          <Header />
          <div className="flex min-h-0 min-w-0 flex-1 flex-col">{children}</div>
        </DesignSystemProvider>
      </body>
    </html>
  )
}
