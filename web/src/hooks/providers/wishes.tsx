import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react'
import { parseCookies, setCookie } from 'nookies'

interface IWishesContextData {
  wishes: string[]
  toggleWish(productId: string): void
  isWished(productId: string): boolean
}

const WishesContext = createContext<IWishesContextData>({} as IWishesContextData)

const WishesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [wishes, setWishes] = useState<string[]>([])

  useEffect(() => {
    const cookies = parseCookies()
    const storedWishes = cookies['@StoreOne:wishes']

    if (storedWishes) {
      try {
        setWishes(JSON.parse(storedWishes))
      } catch {
        setWishes([])
      }
    }
  }, [])

  const toggleWish = useCallback(
    (productId: string) => {
      setWishes((state) => {
        const alreadyWished = state.find((id) => id === productId)
        let newState = []

        if (alreadyWished) {
          newState = state.filter((id) => id !== productId)
        } else {
          newState = [...state, productId]
        }

        setCookie(null, '@StoreOne:wishes', JSON.stringify(newState), {
          maxAge: 60 * 60 * 24 * 30, // 30 days
          path: '/',
        })

        return newState
      })
    },
    [],
  )

  const isWished = useCallback(
    (productId: string) => {
      return !!wishes.find((id) => id === productId)
    },
    [wishes],
  )

  return (
    <WishesContext.Provider value={{ wishes, toggleWish, isWished }}>
      {children}
    </WishesContext.Provider>
  )
}

function useWishes(): IWishesContextData {
  const context = useContext(WishesContext)

  return context
}

export { WishesProvider, useWishes }
