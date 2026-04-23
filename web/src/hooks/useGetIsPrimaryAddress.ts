import { api } from '@/utils/handleClient'
import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useQuery } from '@tanstack/react-query'
import { IAddressDTO } from '@/pages/dtos/address.dto'

const getIsPrimaryAddress = async (url: string) => {
  try {
    const response = await api.get(
      urlBuilder({
        address: url,
      }),
    )

    return response.data.result as [IAddressDTO[], number]
  } catch (error) {
    console.error(error)
  }
}

export const useGetIsPrimaryAddress = () => {
  const url = [URLs.ADDRESS, URLs.ADDRESS_IS_PRIMARY].join('')

  return useQuery({
    queryKey: ['getIsPrimaryAddress'],
    queryFn: () => getIsPrimaryAddress(url),
    enabled: false,
  })
}
