import { api } from '@/utils/handleClient'
import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useQuery } from '@tanstack/react-query'
import { IOrderDTO } from '@/pages/admin/dtos/orders.dto'

const getOrder = async (orderId: string) => {
  try {
    const response = await api.get(
      urlBuilder({
        address: [URLs.ORDERS, orderId].join('/'),
      }),
    )

    return response.data.result as IOrderDTO
  } catch (error) {
    console.error(error)
  }
}

export const useGetOrder = (orderId: string) => {
  return useQuery({
    queryKey: ['getOrder'],
    queryFn: () => getOrder(orderId),
    enabled: false,
  })
}

