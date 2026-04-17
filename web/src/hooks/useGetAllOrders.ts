import { api } from '@/utils/handleClient'
import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useQuery } from '@tanstack/react-query'
import { IPaginationOptionDTO } from '@/pages/dtos/paginationOption.dto'
import { useBuilderUrl } from './useBuilderUrl'
import { IOrderDTO } from '@/pages/dtos/orders.dto'

const getAllOrders = async (url: string) => {
  try {
    const response = await api.get(
      urlBuilder({
        address: url,
      }),
    )

    return response.data as [IOrderDTO[], number]
  } catch (error) {
    console.error(error)
  }
}

export const useGetAllOrders = (options?: IPaginationOptionDTO) => {
  const { url } = useBuilderUrl(URLs.ORDERS, options)

  return useQuery({
    queryKey: ['getAllOrders'],
    queryFn: () => getAllOrders(url),
    enabled: false,
  })
}
