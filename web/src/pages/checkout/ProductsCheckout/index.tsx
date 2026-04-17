import { Text } from '@lemonade-technologies-hub-ui/react'
import formatValue from '@/utils/formatValue'
import Image from 'next/image'
import { Trash } from 'phosphor-react'
import { OrderItem, useOrder } from '@/hooks/providers/order'
import QuantityProduct from '@/components/QuantityProduct'

import {
  BtnRemoveOrder,
  BtnToGoProduct,
  DescriptionWrapper,
  ProductCkeckout,
  ProductsCheckoutContainer,
} from './styles'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function ProductsCheckout() {
  const { removeProductOrder, updateQtyProduct, order } = useOrder()

  function handleChangeQty(productId: string, qty: number) {
    updateQtyProduct(productId, qty)
  }

  function handleRemoveOrder(productId: string) {
    removeProductOrder(productId)
  }

  const router = useRouter()

  function toGoProduct(href: string) {
    router.push(href)
  }

  const [total, setTotal] = useState(0)
  const [orders, setOrders] = useState<OrderItem[]>()

  useEffect(() => {
    const total = order.items.reduce((acc, order) => {
      return acc + order.price * order.quantity
    }, 0)

    setOrders(order.items)
    setTotal(total)
  }, [order])

  return (
    <ProductsCheckoutContainer>
      {orders?.map((order) => (
        <ProductCkeckout key={order.id}>
          <Image src={order.pictureUrl} width={60} height={60} alt={order.id} />
          <DescriptionWrapper>
            <BtnToGoProduct
              onClick={() =>
                toGoProduct(`/${order.typeProduct}/${order.slug}/${order.id}`)
              }
            >
              <Text as="span" size={'sm'}>
                {order.name}
              </Text>
            </BtnToGoProduct>
            <div>
              <QuantityProduct
                size="sm"
                initial={order.quantity}
                onChangeQty={(qty) => handleChangeQty(order.id, qty)}
              />
              <Text>x</Text>
              <Text>{formatValue(order.price)}</Text>
              <Text>=</Text>
              <Text as="strong">
                {formatValue(order.price * order.quantity)}
              </Text>
            </div>
          </DescriptionWrapper>

          <BtnRemoveOrder onClick={() => handleRemoveOrder(order.id)}>
            <Trash size={20} />
          </BtnRemoveOrder>
        </ProductCkeckout>
      ))}
      <Text>
        Total dos produtos: <Text as="strong">{formatValue(total)}</Text>
      </Text>
    </ProductsCheckoutContainer>
  )
}
