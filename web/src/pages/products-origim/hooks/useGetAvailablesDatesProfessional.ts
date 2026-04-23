import { api } from '@/utils/handleClient'
import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useQuery } from '@tanstack/react-query'
import { useBuilderUrl } from '../../../hooks/useBuilderUrl'

interface Queries {
  date: string | null
}

interface Response {
  possibleTimes: number[]
  availableTimes: number[]
}

const getAvaiablesDatesProfessional = async (url: string) => {
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

export const useGetAvailablesDatesProfessional = (
  professionalId: string | null,
  queries: Queries,
) => {
  const uri = [
    URLs.PROFESSIONALS,
    URLs.PROFESSIONALS_TIME_INTERVALS,
    URLs.PROFESSIONALS_AVAILABLES,
    '/',
    professionalId,
  ].join('')

  const { url } = useBuilderUrl(uri, { limit: 99999, page: 1 }, { ...queries })
  return useQuery({
    queryKey: ['getAvaiablesDatesProfessional'],
    queryFn: () => getAvaiablesDatesProfessional(url),
    enabled: false,
  })
}
