import { api } from '@/utils/handleClient'
import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useQuery } from '@tanstack/react-query'
import { ITeamsDTO } from '../schedules/dtos/teams.dto'

const getTeam = async (teamId: string | null) => {
  try {
    if (!teamId) {
      return
    }

    const response = await api.get(
      urlBuilder({
        address: [URLs.TEAMS, teamId].join('/'),
      }),
    )

    return response.data as ITeamsDTO
  } catch (error) {
    console.error(error)
  }
}

export const useGetTeam = (teamId: string | null) => {
  return useQuery({
    queryKey: ['getTeam'],
    queryFn: () => getTeam(teamId),
    enabled: false,
  })
}

