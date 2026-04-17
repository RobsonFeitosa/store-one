import Link from 'next/link'
import { CaretDown, CaretUp, ShoppingCart, User } from 'phosphor-react'
import { useAuth } from '@/hooks/providers/auth'
import { Text } from '@lemonade-technologies-hub-ui/react'
import { useOrder } from '@/hooks/providers/order'
import { useEffect, useState } from 'react'
import Balance from '../../Balance'

import {
  BtnCart,
  Cart,
  LinkMyAccount,
  MyAccount,
  SideWrapperAccountContainer,
  TextLabel,
} from './styles'

export default function SideWrapperAccount() {
  const { user } = useAuth()
  const { order, toggle, toggleBalance } = useOrder()
  const [totalCart, setTotalCart] = useState(0)
  const [hasOrder, setHasOrder] = useState(false)

  useEffect(() => {
    if (order.items.length === 0) {
      toggleBalance(false)
    }
  }, [order, toggleBalance])

  useEffect(() => {
    const totalItems = order.items.reduce((acc, product) => {
      return acc + product.quantity
    }, 0)

    setTotalCart(totalItems)
  }, [order])

  useEffect(() => {
    setHasOrder(order.items.length > 0)
  }, [order])

  return (
    <SideWrapperAccountContainer>
      <MyAccount>
        {user && (
          <LinkMyAccount href="/dashboard">
            <User size={24} />
            <div>
              <Text as="span">{user.name}</Text>
              <Text as="span">Minha conta</Text>
            </div>
          </LinkMyAccount>
        )}

        {!user && (
          <Link href="/signin">
            <User size={24} />
            <Text as="span">Entrar</Text>
          </Link>
        )}
      </MyAccount>

      <Cart>
        <TextLabel>{totalCart}</TextLabel>
        <ShoppingCart size={24} />
        <BtnCart onClick={() => toggleBalance(!toggle)} disabled={!hasOrder}>
          <Text as="span">Carrinho</Text>
          {hasOrder && (
            <>{toggle ? <CaretUp size={14} /> : <CaretDown size={14} />}</>
          )}
        </BtnCart>
      </Cart>

      {toggle && <Balance />}
    </SideWrapperAccountContainer>
  )
}
