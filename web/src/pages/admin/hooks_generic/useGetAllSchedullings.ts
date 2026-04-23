import { api } from '@/utils/handleClient'
import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useQuery } from '@tanstack/react-query'
import { IPaginationOptionDTO } from '@/pages/admin/dtos/paginationOption.dto'
import { useBuilderUrl } from './useBuilderUrl'
import { IScheduleDTO } from '@/pages/admin/dtos/schedule.dto'

const getAllSchedullings = async (url: string) => {
  try {
    const response = await api.get(
      urlBuilder({
        address: url,
      }),
    )

    return response.data as [IScheduleDTO[], number]
  } catch (error) {
    console.error(error)
  }
}

export const useGetAllSchedullings = (options?: IPaginationOptionDTO) => {
  const { url } = useBuilderUrl(URLs.SCHEDULES, options)

  return useQuery({
    queryKey: ['getAllSchedullings'],
    queryFn: () => getAllSchedullings(url),
    enabled: false,
  })
}

