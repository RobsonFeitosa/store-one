import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useMutation } from '@tanstack/react-query'
import { api } from '@/utils/handleClient'
import { TeamsFormData } from '../teams/FormTeams'

interface UpdateTeamProps {
  payload: TeamsFormData
  teamId: string | undefined
}

const updateTeam = async ({ payload, teamId }: UpdateTeamProps) => {
  if (!teamId) {
    return
  }

  try {
    const response = await api.put(
      urlBuilder({
        address: [URLs.TEAMS, teamId].join('/'),
      }),
      payload,
    )

    return response
  } catch (error) {
    console.error(error)
  }
}

export const useUpdateTeam = (teamId: string | undefined) => {
  return useMutation({
    mutationFn: (payload: TeamsFormData) => updateTeam({ payload, teamId }),
  })
}

