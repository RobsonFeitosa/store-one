import { api } from '@/utils/handleClient'
import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useQuery } from '@tanstack/react-query'
import { StatusOrder } from '@/pages/dtos/orders.dto'

const getAllOrderStatus = async (uri: string, orderId: string) => {
  try {
    const response = await api.get(
      urlBuilder({
        address: [uri, orderId].join('/'),
      }),
    )

    return response.data.result as [StatusOrder[], number]
  } catch (error) {
    console.error(error)
  }
}

export const useGetAllStatusByOrder = (orderId: string) => {
  const uri = [URLs.ORDERS, URLs.ORDERS_STATUS].join('')

  return useQuery({
    queryKey: ['getAllOrderStatus'],
    queryFn: () => getAllOrderStatus(uri, orderId),
    enabled: false,
  })
}
