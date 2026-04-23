import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useMutation } from '@tanstack/react-query'
import { api } from '@/utils/handleClient'

const deleteTeam = async (teamId: string) => {
  try {
    await api.delete(
      urlBuilder({
        address: [URLs.TEAMS, teamId].join('/'),
      }),
    )
  } catch (error) {
    console.error(error)
  }
}

export const useDeleteTeam = () => {
  return useMutation({
    mutationFn: (teamId: string) => deleteTeam(teamId),
  })
}

