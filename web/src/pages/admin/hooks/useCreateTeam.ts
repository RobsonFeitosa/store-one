import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useMutation } from '@tanstack/react-query'
import { api } from '@/utils/handleClient'
import { TeamsFormData } from '../teams/FormTeams'

interface CreateTeamProps {
  payload: TeamsFormData
}

const createTeam = async ({ payload }: CreateTeamProps) => {
  try {
    const response = await api.post(
      urlBuilder({
        address: [URLs.TEAMS].join(''),
      }),
      payload,
    )

    return response
  } catch (error) {
    console.error(error)
  }
}

export const useCreateTeam = () => {
  return useMutation({
    mutationFn: (payload: TeamsFormData) => createTeam({ payload }),
  })
}

