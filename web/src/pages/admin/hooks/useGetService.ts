import { api } from '@/utils/handleClient'
import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useQuery } from '@tanstack/react-query'
import { IServiceDTO } from '../schedules/dtos/service.dto'

const getService = async (id: string | null) => {
  try {
    if (!id) {
      return
    }

    const response = await api.get(
      urlBuilder({
        address: [URLs.SCHEDULES, URLs.SCHEDULES_SERVICES, '/', id].join(''),
      }),
    )

    return response.data.result as IServiceDTO
  } catch (error) {
    console.error(error)
  }
}

export const useGetService = (id: string | null) => {
  return useQuery({
    queryKey: ['getService'],
    queryFn: () => getService(id),
    enabled: false,
  })
}

