import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useMutation } from '@tanstack/react-query'
import { api } from '@/utils/handleClient'

interface CreateAttributeProps {
  attributeId: string
  variationId: string
}

const deleteVariation = async ({
  variationId,
  attributeId,
}: CreateAttributeProps) => {
  try {
    const uri = [
      URLs.PRODUCTS,
      URLs.PRODUCTS_ATTRIBUTES,
      '/',
      attributeId,
      URLs.PRODUCTS_VARIATIONS,
      '/',
      variationId,
    ].join('')

    const response = await api.delete(
      urlBuilder({
        address: uri,
      }),
    )

    return response
  } catch (error) {
    console.error(error)
  }
}

export const useDeleteVariation = (attributeId: string) => {
  return useMutation({
    mutationFn: (variationId: string) =>
      deleteVariation({ attributeId, variationId }),
  })
}

