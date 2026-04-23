import { api } from '@/utils/handleClient'
import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useQuery } from '@tanstack/react-query'
import { IUserDTO } from '@/pages/dtos/user.dto'

interface UserProfessionalId extends IUserDTO {
  professionalId: string
}

const getAllUsersTeamsAvailables = async () => {
  try {
    const response = await api.get(
      urlBuilder({
        address: [URLs.TEAMS, URLs.USERS_AVAILABLES].join(''),
      }),
    )

    return response.data.result as UserProfessionalId[]
  } catch (error) {
    console.error(error)
  }
}

export const useGetAllUsersTeamsAvailables = () => {
  return useQuery({
    queryKey: ['getAllUsersTeamsAvailables'],
    queryFn: () => getAllUsersTeamsAvailables(),
    enabled: false,
  })
}

