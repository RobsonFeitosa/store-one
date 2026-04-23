import '../libs/dayjs'
import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import type { AppProps } from 'next/app'
import { globalStyles } from '../styles/global'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AppProvider from '@/hooks'
import 'keen-slider/keen-slider.min.css'

import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

globalStyles()

const queryClient = new QueryClient()

export default function App({
  Component,
  pageProps: { ...pageProps },
}: AppProps) {
  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class">
        <QueryClientProvider client={queryClient}>
          <AppProvider>
            <Component {...pageProps} className={inter.className} />
          </AppProvider>
        </QueryClientProvider>
      </NextThemesProvider>
    </NextUIProvider>
  )
}
