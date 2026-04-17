import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { parseCookies, setCookie } from 'nookies'

export interface OrderItem {
  id: string
  name: string
  quantity: number
  price: number
  pictureUrl: string
  slug: string
  typeProduct: 'service' | 'product'
  variations?: string[]
}

export interface Order {
  items: OrderItem[]
  config: {
    pixQRCodeURL: string
  }
  transferId: string
  orderId: string
}

interface OrdersContextData {
  order: Order
  toggle: boolean
  setPaid(paid: boolean): void
  setEmptyOrder(): void
  setQRCode(code: string): void
  setTransactionId(id: string): void
  setOrderId(id: string): void
  addOrder(order: OrderItem, qty: number, priceVariation?: number): void
  updateQtyProduct(productId: string, qty: number): void
  removeProductOrder(productId: string): void
  toggleBalance(act: boolean): void
}

const emptyOrder: Order = {
  items: [],
  config: {
    pixQRCodeURL: '',
  },
  transferId: '',
  orderId: '',
}

const OrderContext = createContext<OrdersContextData>({} as OrdersContextData)

const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toggle, setToggle] = useState(false)

  const [order, setOrder] = useState<Order>(() => {
    const cookies = parseCookies()
    const { '@LemonadeTechnologies:order': orderCookie } = cookies

    if (orderCookie) {
      return JSON.parse(orderCookie)
    }

    return emptyOrder
  })

  const toggleBalance = useCallback((act: boolean) => {
    setToggle(act)
  }, [])

  const setPaid = useCallback((paid: boolean) => {
    setOrder((state) => ({
      ...state,
      config: {
        ...state.config,
        paid,
      },
    }))
  }, [])

  const setQRCode = useCallback((code: string) => {
    setOrder((state) => ({
      ...state,
      config: {
        ...state.config,
        pixQRCodeURL: code,
      },
    }))
  }, [])

  const setTransactionId = useCallback((id: string) => {
    setOrder((state) => ({
      ...state,
      transferId: id,
    }))
  }, [])

  const setOrderId = useCallback((id: string) => {
    setOrder((state) => ({
      ...state,
      orderId: id,
    }))
  }, [])

  // const addProductOrder = useCallback((product: IProductDTO) => {
  //   setOrder((state) => ({
  //     ...state,
  //     productsOrder: productExist(state.productsOrder, product.id)
  //       ? state.productsOrder.filter((prd) => prd.id !== product.id)
  //       : [
  //           ...state.productsOrder,
  //           {
  //             id: product.id,
  //             name: product.name,
  //             quantity: product.product_data?.quantity ?? 1,
  //           },
  //         ],
  //   }))
  // }, [])

  const addOrder = useCallback(
    (orderItem: OrderItem, qty: number, priceVariation?: number) => {
      const ids = order.items.map((od) => od.id)

      if (ids.includes(orderItem.id)) {
        const newProducts = order.items.map((prd) => {
          if (prd.id === orderItem.id) {
            return {
              ...prd,
              ...(priceVariation && { price: priceVariation }),
              quantity: qty,
            }
          }
          return prd
        })

        setOrder((state) => ({
          ...state,
          items: newProducts,
        }))
      } else {
        setOrder((state) => ({
          ...state,
          items: [...state.items, orderItem],
        }))
      }
    },
    [order],
  )

  const updateQtyProduct = useCallback(
    (productId: string, qty: number) => {
      const products = order.items
      const newProducts = products.map((prd) => {
        if (prd.id === productId) {
          return {
            ...prd,
            quantity: qty,
          }
        }
        return prd
      })
      setOrder((state) => ({
        ...state,
        items: newProducts,
      }))
    },
    [order],
  )

  const removeProductOrder = useCallback((productId: string) => {
    setOrder((state) => ({
      ...state,
      items: state.items.filter((product) => product.id !== productId),
    }))
  }, [])

  const setEmptyOrder = useCallback(() => {
    setOrder(emptyOrder)

    // setCookie(null, '@LemonadeTechnologies:order', JSON.stringify(emptyOrder), {
    //   maxAge: 60 * 60 * 24 * 7, // 7 days
    //   path: '/',
    // })
  }, [])

  useEffect(() => {
    if (order) {
      setCookie(null, '@LemonadeTechnologies:order', JSON.stringify(order), {
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      })
    }
  }, [order])

  return (
    <OrderContext.Provider
      value={{
        order,
        toggle,
        setPaid,
        setEmptyOrder,
        toggleBalance,
        setQRCode,
        addOrder,
        setTransactionId,
        updateQtyProduct,
        setOrderId,
        removeProductOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}

function useOrder(): OrdersContextData {
  const context = useContext(OrderContext)

  if (!context) {
    throw new Error('useOrder must be used within a OrderProvider')
  }

  return context
}

export { OrderProvider, useOrder }
