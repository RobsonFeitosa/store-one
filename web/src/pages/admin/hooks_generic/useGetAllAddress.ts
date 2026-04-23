import { api } from '@/utils/handleClient'
import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useQuery } from '@tanstack/react-query'
import { IAddressDTO } from '@/pages/dtos/address.dto'

const getAddress = async () => {
  try {
    const response = await api.get(
      urlBuilder({
        address: URLs.ADDRESS,
      }),
    )

    return response.data.result as [IAddressDTO[], number]
  } catch (error) {
    console.error(error)
  }
}

export const useGetAllAddress = () => {
  return useQuery({
    queryKey: ['getAddress'],
    queryFn: () => getAddress(),
    enabled: false,
  })
}

