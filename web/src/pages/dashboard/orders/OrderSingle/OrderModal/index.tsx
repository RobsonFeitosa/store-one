import { Text } from '@lemonade-technologies-hub-ui/react'
import { IProductsOrder } from '@/pages/dtos/orders.dto'
import Image from 'next/image'
import Link from 'next/link'
import { DialogCloseCustom } from '@/components/DialogCloseCustom'

import {
  ImagesWrapper,
  OrderModalContainer,
  OrderProductContent,
  OrderProductWP,
  OrderProductWrapper,
} from './styles'

interface OrderModalprops {
  onClose: () => void
  productsOrder: IProductsOrder[]
}

export default function OrderModal({
  onClose,
  productsOrder,
}: OrderModalprops) {
  return (
    <>
      <DialogCloseCustom onClose={onClose} />

      <OrderModalContainer>
        {productsOrder.map((order_product) => (
          <OrderProductWrapper key={order_product.id}>
            <ImagesWrapper>
              {order_product.product.images && (
                <Image
                  src={order_product.product.images[0].picture_url}
                  width={80}
                  height={80}
                  alt={order_product.product.name}
                />
              )}
            </ImagesWrapper>
            <OrderProductContent>
              <Link
                href={`/${order_product.product.type}s/${order_product.product.slug}/${order_product.product.id}`}
              >
                {order_product.product.name}
              </Link>

              <OrderProductWP>
                <Text>Quantidade: {order_product.quantity}</Text>
              </OrderProductWP>
            </OrderProductContent>
          </OrderProductWrapper>
        ))}
      </OrderModalContainer>
    </>
  )
}
