import { Text } from '@lemonade-technologies-hub-ui/react'
import { IOrderDTO } from '@/pages/admin/dtos/orders.dto'
import builderLastStatus from '@/pages/admin/utils_pages/builderLastStatus'
import formatValue from '@/utils/formatValue'
import formatDate from '@/utils/formatDate'
import { OrderFooter } from '../styles'
import toShortStatusOrder from '../utils/toShortStatusOrder'

import {
  BoxWhite,
  BtnEdit,
  OrderContainer,
  OrderContent,
  OrderHeader,
  OrderSingle,
} from './styles'

interface OrderProps {
  order: IOrderDTO
  onEditOrderId: (orderId: string) => void
}

export default function Order({ order, onEditOrderId }: OrderProps) {
  const statusReverse = toShortStatusOrder(order.status ?? [])

  const isProduct = order.type_product === 'product'

  const label = isProduct ? 'produto' : 'serviço'

  return (
    <OrderContainer>
      <OrderSingle>
        <div>
          <OrderHeader>
            <Text>
              Cod.: <Text as="strong">{order.cod_order}</Text>
            </Text>

            <Text>
              {isProduct ? builderLastStatus(statusReverse) : 'Agendamento'}
            </Text>
          </OrderHeader>
          <hr />

          <OrderContent>
            <div>
              <div>
                <Text> Cliente: {order.user.name} </Text>
                <Text>Total: {formatValue(Number(order.amount))} </Text>
              </div>
              <div>
                <Text> Tipo: {label} </Text>
                <Text>
                  Data do pedido:{' '}
                  {formatDate({
                    date: order.created_at,
                  })}
                </Text>
              </div>
            </div>
            <BoxWhite>
              {!isProduct ? (
                <Text>Profissional: {order.professional_name}</Text>
              ) : (
                <Text>
                  Endereço:{' '}
                  {`${order.address.neighborhood}, ${order.address.street}, ${order.address.street_number} - ${order.address.city}/${order.address.state}`}
                </Text>
              )}
            </BoxWhite>
          </OrderContent>
        </div>
        <OrderFooter>
          <BtnEdit onClick={() => onEditOrderId(order.id)}>
            {isProduct ? 'Editar status' : 'Visualizar'}
          </BtnEdit>
        </OrderFooter>
      </OrderSingle>
    </OrderContainer>
  )
}
