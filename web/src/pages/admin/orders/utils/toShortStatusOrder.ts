import { StatusOrder } from '@/pages/dtos/orders.dto'

export default function toShortStatusOrder(status: StatusOrder[]) {
  return status.sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  )
}
