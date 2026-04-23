import { api } from '@/utils/handleClient'
import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useQuery } from '@tanstack/react-query'
import { useBuilderUrl } from '@/hooks/useBuilderUrl'
import { IPaginationOptionDTO } from '@/pages/dtos/paginationOption.dto'
import { IServiceDTO } from '../schedules/dtos/service.dto'

const getServices = async (url: string) => {
  try {
    const response = await api.get(
      urlBuilder({
        address: url,
      }),
    )

    return response.data as [IServiceDTO[], number]
  } catch (error) {
    console.error(error)
  }
}

export const useGetAllServices = (options?: IPaginationOptionDTO) => {
  const uri = [URLs.SCHEDULES, URLs.SCHEDULES_SERVICES].join('/')

  const { url } = useBuilderUrl(uri, options)

  return useQuery({
    queryKey: ['getServices'],
    queryFn: () => getServices(url),
    enabled: false,
  })
}

