import { StatusOrder } from '../dtos/orders.dto'

export function builderStatusNamed(name: string | undefined) {
  switch (name) {
    case 'pending':
      return 'Pendente'
    case 'awaiting_payment':
      return 'Aguardando pagamento'
    case 'awaiting_fulfillment':
      return 'Aguardando cumprimento'
    case 'awaiting_shipment':
      return 'Aguardando envio'
    case 'awaiting_pickup':
      return 'Aguardando coleta'
    case 'partially_shipped':
      return 'Enviado parcialmente'
    case 'completed':
      return 'Concluído'
    case 'shiped':
      return 'Enviado'
    case 'cancelled':
      return 'Cancelado'
    case 'declined':
      return 'Recusou'
    case 'refunded':
      return 'Devolveu'
    case 'disputed':
      return 'disputado'
    default:
      return ''
  }
}

export default function builderLastStatus(statusOrder: StatusOrder[] | null) {
  const status = statusOrder && statusOrder[0]

  // const status = statusOrder && statusOrder.shift()

  return builderStatusNamed(status?.name)
}
