import { api } from '@/utils/handleClient'
import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useQuery } from '@tanstack/react-query'
import { IProviderDTO } from '../dtos/providers.dto'

const getProvider = async (providerId: string) => {
  try {
    const response = await api.get(
      urlBuilder({
        address: [URLs.PRODUCTS, URLs.PRODUCTS_PROVIDERS, '/', providerId].join(
          '',
        ),
      }),
    )

    return response.data.result as IProviderDTO
  } catch (error) {
    console.error(error)
  }
}

export const useGetProvider = (providerId: string) => {
  return useQuery({
    queryKey: ['getProvider'],
    queryFn: () => getProvider(providerId),
    enabled: false,
  })
}

