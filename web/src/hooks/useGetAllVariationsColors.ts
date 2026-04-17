import { api } from '@/utils/handleClient'
import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useQuery } from '@tanstack/react-query'
import { useBuilderUrl } from './useBuilderUrl'

interface getAllColors {
  color: string
  total: string
}

const getAllVariationsColors = async (url: string) => {
  try {
    const response = await api.get(
      urlBuilder({
        address: url,
      }),
    )

    return response.data as getAllColors[]
  } catch (error) {
    console.error(error)
  }
}

export const useGetAllVariationsColors = () => {
  const { url } = useBuilderUrl(
    [URLs.PRODUCTS, URLs.PRODUCTS_VARIATIONS_COLORS].join(''),
  )

  return useQuery({
    queryKey: ['getAllVariationsColors'],
    queryFn: () => getAllVariationsColors(url),
    enabled: false,
  })
}
