import { SummaryPaymentContainer, SummaryProduct, WrapperTotal } from './styles'
import { Text } from '@lemonade-technologies-hub-ui/react'
import formatValue from '@/utils/formatValue'
import { OrderItem, useOrder } from '@/hooks/providers/order'
import { useEffect, useState } from 'react'

interface SummaryPaymentProps {
  discount?: number
}

export function SummaryPayment({ discount = 0 }: SummaryPaymentProps) {
  const { order } = useOrder()

  const [total, setTotal] = useState(0)
  const [orders, setOrders] = useState<OrderItem[]>()

  useEffect(() => {
    const total = order.items.reduce((acc, order) => {
      return acc + order.price * order.quantity
    }, 0)

    setOrders(order.items)
    setTotal(total)
  }, [order.items])

  return (
    <SummaryPaymentContainer>
      {orders?.map((order) => (
        <SummaryProduct key={order.id}>
          <Text>
            {order.quantity} x {order.name}
          </Text>
          <Text as="strong">{formatValue(order.quantity * order.price)}</Text>
        </SummaryProduct>
      ))}

      <WrapperTotal>
        <Text as="strong">SubTotal: {formatValue(total)}</Text>
        <Text as="strong">Frete: {formatValue(1500)}</Text>

        <Text as="strong">Cupom: -{formatValue(discount)}</Text>
      </WrapperTotal>
    </SummaryPaymentContainer>
  )
}
