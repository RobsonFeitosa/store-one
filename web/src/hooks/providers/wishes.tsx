import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { parseCookies, setCookie } from 'nookies'

interface WishesContextData {
  wishes: string[]
  toggleWish(id: string): void
}

const WishesContext = createContext<WishesContextData>({} as WishesContextData)

const WishesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [wishes, setWishes] = useState<string[]>(() => {
    const cookies = parseCookies()
    const { '@LemonadeTechnologies:wishes': wishesCookie } = cookies

    if (wishesCookie) {
      return JSON.parse(wishesCookie)
    }

    return []
  })

  const toggleWish = useCallback(
    (id: string) => {
      if (wishes.includes(id)) {
        setWishes((state) => state.filter((s) => s !== id))
      } else {
        setWishes((state) => [...state, id])
      }
    },
    [wishes],
  )

  useEffect(() => {
    if (wishes) {
      setCookie(null, '@LemonadeTechnologies:wishes', JSON.stringify(wishes), {
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      })
    }
  }, [wishes])

  return (
    <WishesContext.Provider
      value={{
        wishes,
        toggleWish,
      }}
    >
      {children}
    </WishesContext.Provider>
  )
}

function useWishes(): WishesContextData {
  const context = useContext(WishesContext)

  if (!context) {
    throw new Error('useWishes must be used within a OrderProvider')
  }

  return context
}

export { WishesProvider, useWishes }
