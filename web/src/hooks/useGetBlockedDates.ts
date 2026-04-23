import { api } from '@/utils/handleClient'
import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useQuery } from '@tanstack/react-query'
import { useBuilderUrl } from './useBuilderUrl'

interface Queries {
  year: string
  month: string
}

interface Response {
  blockedWeekDays: number[]
  blockedDates: number[]
}

const getBlockedDates = async (url: string) => {
  try {
    const response = await api.get(
      urlBuilder({
        address: url,
      }),
    )

    return response.data.result as Response
  } catch (error) {
    console.error(error)
  }
}

export const useGetBlockedDates = (
  professionalId: string | null,
  queries: Queries,
) => {
  const uri = [
    URLs.PROFESSIONALS,
    URLs.PROFESSIONALS_TIME_INTERVALS,
    URLs.PROFESSIONALS_BLOCKED_DATES,
    '/',
    professionalId,
  ].join('')

  const { url } = useBuilderUrl(uri, { limit: 99999, page: 1 }, { ...queries })
  return useQuery({
    queryKey: ['getBlockedDates'],
    queryFn: () => getBlockedDates(url),
    enabled: false,
  })
}
