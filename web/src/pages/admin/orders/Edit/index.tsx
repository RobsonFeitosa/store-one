import { IOrderDTO } from '@/pages/admin/dtos/orders.dto'
import {
  EditContainer,
  OrderProductSummary,
  OrderProductSummaryContent,
  ProductContent,
  SummaryProduct,
  TextAddress,
  TextTotal,
  TotalsWrapper,
} from './styles'
import { DialogCloseCustom } from '@/components/DialogCloseCustom'
import { Text } from '@lemonade-technologies-hub-ui/react'
import builderLastStatus from '@/pages/admin/utils_pages/builderLastStatus'
import formatDate from '@/utils/formatDate'
import formatValue from '@/utils/formatValue'
import Image from 'next/image'
import OrderStatus from './OrderStatus'
import { OrderContent, OrderHeader } from '../Order/styles'
import { useEffect, useState } from 'react'
import { useGetOrder } from '../../hooks_generic/useGetOrder'
import toShortStatusOrder from '../utils/toShortStatusOrder'
import { IPaginationOptionDTO } from '@/pages/admin/dtos/paginationOption.dto'

// function sumProductsTotal(orders_product: IProductsOrder[]) {
//   return orders_product.reduce((acc, orders_product) => {
//     return (
//       acc +
//       (orders_product?.product?.price ?? 0) *
//         (orders_product.product.product_data?.quantity ?? 0)
//     )
//   }, 0)
// }

interface EditProps {
  orderId: string
  optionsPage: IPaginationOptionDTO
  onClose: () => void
}

export default function Edit({ orderId, onClose, optionsPage }: EditProps) {
  const { data: orderData, refetch: getOrder } = useGetOrder(orderId)
  const [order, setOrder] = useState<IOrderDTO | null>(null)
  const [total, setTotal] = useState<number>(0)
  const [amount, setAmount] = useState<number>(0)
  const [couponValue, setCouponValue] = useState<number>(0)
  const [freteValue, setFreteValue] = useState<number>(0)

  useEffect(() => {
    getOrder()
  }, [getOrder])

  useEffect(() => {
    if (orderData) {
      const frete = orderData.freight ? JSON.parse(orderData.freight) : {}
      const coupon = orderData.coupon_applied
        ? JSON.parse(orderData.coupon_applied)
        : {}

      setOrder(orderData)
      setAmount(orderData.amount)
      setFreteValue(frete?.value ?? 0)
      setCouponValue(coupon?.discount ?? 0)
      setTotal(orderData.amount + (frete.value ?? 0) - (coupon?.discount ?? 0))
    }
  }, [orderData])

  const statusShort = toShortStatusOrder(order?.status ?? [])

  const isProduct = order?.type_product === 'product'

  const labelProduct = isProduct ? 'produto' : 'servićo'

  return (
    order && (
      <EditContainer>
        <DialogCloseCustom onClose={onClose} />
        <OrderHeader>
          <Text>
            Cod.: <Text as="strong">{order.cod_order}</Text>
          </Text>

          <Text>
            {isProduct ? builderLastStatus(statusShort) : 'Agendamento'}
          </Text>
        </OrderHeader>

        {isProduct && (
          <>
            <hr />

            <OrderStatus
              orderId={orderId}
              optionsPage={optionsPage}
              trackingCode={order.tracking_code}
            />
          </>
        )}

        <hr />

        <OrderContent>
          <div>
            <div>
              <Text> Cliente: {order.user.name} </Text>
              <Text> Tipo: {labelProduct} </Text>
            </div>
            <div>
              <Text>
                Data do pedido:{' '}
                {formatDate({
                  date: order.created_at,
                })}
              </Text>
              <Text> Profissional: {order.professional_name} </Text>
            </div>
          </div>

          {isProduct && (
            <TextAddress>
              Enderećo:{' '}
              {`${order.address.neighborhood}, ${order.address.street}, ${order.address.street_number} - ${order.address.city}/${order.address.state}`}
            </TextAddress>
          )}
        </OrderContent>

        <hr />

        <OrderProductSummary>
          <OrderProductSummaryContent>
            {order.orders_products.map((orders_product) => (
              <ProductContent key={orders_product.id}>
                {orders_product.product?.images && (
                  <Image
                    src={orders_product.product?.images[0]?.picture_url}
                    width={60}
                    height={60}
                    alt={orders_product.id}
                  />
                )}
                <SummaryProduct>
                  <div>
                    <Text as="span">
                      {orders_product.product.product_data?.quantity ?? 0}
                    </Text>
                    <Text as="span">x </Text>
                    <Text as="span">{orders_product.product.name}</Text>
                  </div>
                  {orders_product.product.product_data?.quantity && (
                    <Text as="strong">
                      {formatValue(
                        orders_product.product.product_data?.quantity *
                          Number(orders_product.price),
                      )}
                    </Text>
                  )}
                </SummaryProduct>
              </ProductContent>
            ))}
          </OrderProductSummaryContent>

          <TotalsWrapper>
            <Text>SubTotal: {formatValue(amount)}</Text>
            {isProduct && <Text>Frete: {formatValue(freteValue)}</Text>}
            <Text>Cupom: -{formatValue(couponValue)}</Text>

            <TextTotal as="strong">
              Total do pedido: {formatValue(total)}
            </TextTotal>
          </TotalsWrapper>
        </OrderProductSummary>
      </EditContainer>
    )
  )
}
