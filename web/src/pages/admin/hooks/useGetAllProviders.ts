import { api } from '@/utils/handleClient'
import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useQuery } from '@tanstack/react-query'
import { IOptionsDTO, useBuilderUrl } from '@/hooks/useBuilderUrl'
import { IProviderDTO } from '../dtos/providers.dto'

const getAllProviders = async (url: string) => {
  try {
    const response = await api.get(
      urlBuilder({
        address: url,
      }),
    )

    return response.data as [IProviderDTO[], number]
  } catch (error) {
    console.error(error)
  }
}

export const useGetAllProviders = (options?: IOptionsDTO) => {
  const uri = [URLs.PRODUCTS, URLs.PRODUCTS_PROVIDERS].join('/')
  const { url } = useBuilderUrl(uri, options)

  return useQuery({
    queryKey: ['getAllProviders'],
    queryFn: () => getAllProviders(url),
    enabled: false,
  })
}

