import { useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'

export { RouteGuard }

interface RouteGuardProps {
  children: ReactNode
}

function RouteGuard({ children }: RouteGuardProps) {
  const router = useRouter()
  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    authCheck(router.asPath)

    const hideContent = () => setAuthorized(false)
    router.events.on('routeChangeStart', hideContent)

    router.events.on('routeChangeComplete', authCheck)

    return () => {
      router.events.off('routeChangeStart', hideContent)
      router.events.off('routeChangeComplete', authCheck)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function authCheck(url: string) {
    const publicPaths = [
      '/',
      '/signin',
      '/signup',
      '/actived',
      '/reset_password',
      '/public',
    ]

    const path = url.split('?')[0]
    const cookies = parseCookies()
    const { '@StoreOne:user': userStorage } = cookies

    if (!userStorage && !publicPaths.includes(path)) {
      setAuthorized(false)
      router.push({
        pathname: '/',
      })
    } else {
      setAuthorized(true)
    }
  }

  return authorized && children
}
