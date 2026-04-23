import { StatusTimeDiscount } from '@/pages/dtos/timeDiscount.dto'

export const statusTimeDiscount = (status: StatusTimeDiscount) => {
  switch (status) {
    case 'actived':
      return 'Ativo'
    case 'cancel':
      return 'Cancelado'
    case 'complete':
      return 'Completo'
    case 'idle':
      return 'Parado'
    default:
      return 'cancelado'
  }
}
