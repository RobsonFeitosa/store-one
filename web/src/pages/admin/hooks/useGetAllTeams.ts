import { api } from '@/utils/handleClient'
import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useQuery } from '@tanstack/react-query'
import { ITeamsDTO } from '../schedules/dtos/teams.dto'
import { useBuilderUrl } from '@/hooks/useBuilderUrl'
import { IPaginationOptionDTO } from '@/pages/dtos/paginationOption.dto'

const getTeams = async (url: string) => {
  try {
    const response = await api.get(
      urlBuilder({
        address: url,
      }),
    )

    return response.data.result as [ITeamsDTO[], number]
  } catch (error) {
    console.error(error)
  }
}

export const useGetAllTeams = (options?: IPaginationOptionDTO) => {
  const { url } = useBuilderUrl(URLs.TEAMS, options)

  return useQuery({
    queryKey: ['getTeams'],
    queryFn: () => getTeams(url),
    enabled: false,
  })
}

