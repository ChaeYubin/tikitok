import { createTheme, MantineProvider } from '@mantine/core'
import localFont from 'next/font/local'
import { PropsWithChildren } from 'react'

export const pretendard = localFont({
  src: '../../public/fonts/pretendard/PretendardVariable.woff2',
  display: 'swap',
  weight: '100 900',
  variable: '--font-pretendard',
  fallback: ['system-ui', 'Helvetica', 'Arial', 'sans-serif'],
})

export const d2coding = localFont({
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

const theme = createTheme({
  fontFamily: pretendard.style.fontFamily,
  fontFamilyMonospace: d2coding.style.fontFamily,
})

export const DesignSystemProvider = ({ children }: PropsWithChildren) => {
  return (
    <MantineProvider theme={theme} defaultColorScheme="auto">
      {children}
    </MantineProvider>
  )
}
