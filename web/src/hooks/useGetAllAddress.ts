import { api } from '@/utils/handleClient'
import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useQuery } from '@tanstack/react-query'
import { IAddressDTO } from '@/pages/dtos/address.dto'
import { IOptionsDTO, useBuilderUrl } from './useBuilderUrl'

const getAddress = async (url: string) => {
  try {
    const response = await api.get(
      urlBuilder({
        address: url,
      }),
    )

    return response.data as [IAddressDTO[], number]
  } catch (error) {
    console.error(error)
  }
}

export const useGetAllAddress = (options?: IOptionsDTO) => {
  const { url } = useBuilderUrl(URLs.ADDRESS, options)

  return useQuery({
    queryKey: ['getAddress'],
    queryFn: () => getAddress(url),
    enabled: false,
  })
}
