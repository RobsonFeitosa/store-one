import { api } from '@/utils/handleClient'
import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useQuery } from '@tanstack/react-query'
import { IOrderDTO } from '@/pages/dtos/orders.dto'

const getLastOrder = async (url: string) => {
  try {
    const response = await api.get(
      urlBuilder({
        address: url,
      }),
    )

    return response.data as IOrderDTO
  } catch (error) {
    console.error(error)
  }
}

export const useGetLastOrder = () => {
  const url = [URLs.ORDERS, URLs.ORDERS_LAST].join('')

  return useQuery({
    queryKey: ['getLastOrder'],
    queryFn: () => getLastOrder(url),
    enabled: false,
  })
}
