import '../libs/dayjs'
import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import type { AppProps } from 'next/app'
import { globalStyles } from '../styles/global'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AppProvider from '@/hooks'

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
            <Component {...pageProps} />
          </AppProvider>
        </QueryClientProvider>
      </NextThemesProvider>
    </NextUIProvider>
  )
}
