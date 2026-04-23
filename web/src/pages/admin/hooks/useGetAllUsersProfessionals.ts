import { api } from '@/utils/handleClient'
import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useQuery } from '@tanstack/react-query'
import { IUserDTO } from '@/pages/dtos/user.dto'

const getUsersProfessionals = async () => {
  try {
    const response = await api.get(
      urlBuilder({
        address: [URLs.PROFESSIONALS, URLs.USERS_AVAILABLES].join(''),
      }),
    )

    return response.data as IUserDTO[]
  } catch (error) {
    console.error(error)
  }
}

export const useGetAllUsersProfessionals = () => {
  return useQuery({
    queryKey: ['getUsersProfessionals'],
    queryFn: () => getUsersProfessionals(),
    enabled: false,
  })
}

