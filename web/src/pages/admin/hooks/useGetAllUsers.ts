import { api } from '@/utils/handleClient'
import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useQuery } from '@tanstack/react-query'
import { IUserDTO } from '@/pages/dtos/user.dto'

const getUsers = async () => {
  try {
    const response = await api.get(
      urlBuilder({
        address: URLs.USERS,
      }),
    )

    return response.data.result as [IUserDTO[], number]
  } catch (error) {
    console.error(error)
  }
}

export const useGetAllUsers = () => {
  return useQuery({
    queryKey: ['getUsers'],
    queryFn: () => getUsers(),
    enabled: false,
  })
}

