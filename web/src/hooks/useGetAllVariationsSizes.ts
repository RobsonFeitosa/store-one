import { api } from '@/utils/handleClient'
import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useQuery } from '@tanstack/react-query'
import { useBuilderUrl } from './useBuilderUrl'

interface getAllSizes {
  size: string
  total: string
}

const getAllVariationsSizes = async (url: string) => {
  try {
    const response = await api.get(
      urlBuilder({
        address: url,
      }),
    )

    return response.data as getAllSizes[]
  } catch (error) {
    console.error(error)
  }
}

export const useGetAllVariationsSizes = () => {
  const { url } = useBuilderUrl(
    [URLs.PRODUCTS, URLs.PRODUCTS_VARIATIONS_SIZES].join(''),
  )

  return useQuery({
    queryKey: ['getAllVariationsSizes'],
    queryFn: () => getAllVariationsSizes(url),
    enabled: false,
  })
}
