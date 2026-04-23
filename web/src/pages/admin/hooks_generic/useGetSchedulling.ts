import { api } from '@/utils/handleClient'
import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useQuery } from '@tanstack/react-query'
import { IOrderDTO } from '@/pages/dtos/orders.dto'

const getSchedulling = async (schedullingId: string) => {
  try {
    const response = await api.get(
      urlBuilder({
        address: [URLs.SCHEDULES, schedullingId].join('/'),
      }),
    )

    return response.data.result as IOrderDTO
  } catch (error) {
    console.error(error)
  }
}

export const useGetSchedulling = (schedullingId: string) => {
  return useQuery({
    queryKey: ['getSchedulling'],
    queryFn: () => getSchedulling(schedullingId),
    enabled: false,
  })
}

