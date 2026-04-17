import { Text } from '@lemonade-technologies-hub-ui/react'
import Balance from '../Balance'
import { FiChevronDown } from 'react-icons/fi'
import { useOrder } from '@/hooks/providers/order'

import { BtnMoreBill, NavContainer, MyOrder } from './styles'
import { useEffect, useState } from 'react'

export default function Nav() {
  const { toggleBalance, toggle, order } = useOrder()
  const [quantity, setQuantity] = useState(0)
  const [hasOrder, setHasOrder] = useState(false)

  useEffect(() => {
    if (order.items.length === 0) {
      toggleBalance(false)
    }
  }, [order, toggleBalance])

  useEffect(() => {
    const quantity = order.items.reduce((acc, product) => {
      return acc + product.quantity
    }, 0)
    setQuantity(quantity)
  }, [order, toggleBalance])

  useEffect(() => {
    setHasOrder(order.items.length > 0)
  }, [order])

  return (
    <NavContainer>
      categorias dos produtos
      <MyOrder>
        <Text as="span" style={{ marginRight: 8 }}>
          Meus pedidos ({quantity})
        </Text>

        {hasOrder && (
          <div>
            <BtnMoreBill onClick={() => toggleBalance(!toggle)}>
              <FiChevronDown size={16} />
            </BtnMoreBill>
          </div>
        )}
      </MyOrder>
      {toggle && <Balance />}
    </NavContainer>
  )
}
