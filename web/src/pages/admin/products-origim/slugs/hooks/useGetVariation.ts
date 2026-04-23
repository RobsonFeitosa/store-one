import { IVariationDTO } from '@/pages/admin/dtos/variation.dto'
import { api } from '@/utils/handleClient'
import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useQuery } from '@tanstack/react-query'

const getVariation = async (url: string) => {
  try {
    const response = await api.get(
      urlBuilder({
        address: url,
      }),
    )

    return response.data as [IVariationDTO[], number]
  } catch (error) {
    console.error(error)
  }
}

export const useGetVariation = (attributeId?: string, variationId?: string) => {
  const productUri = [
    URLs.PRODUCTS,
    URLs.PRODUCTS_ATTRIBUTES,
    '/',
    attributeId,
    URLs.PRODUCTS_VARIATIONS,
    '/',
    variationId,
  ].join('')

  return useQuery({
    queryKey: ['getVariation'],
    queryFn: () => getVariation(productUri),
    enabled: false,
  })
}

