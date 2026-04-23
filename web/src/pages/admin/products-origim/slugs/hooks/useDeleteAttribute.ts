import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useMutation } from '@tanstack/react-query'
import { api } from '@/utils/handleClient'

interface CreateAttributeProps {
  productId: string
  attributeId: string
}

const deleteAttribute = async ({
  attributeId,
  productId,
}: CreateAttributeProps) => {
  try {
    const uri = [
      URLs.PRODUCTS,
      '/',
      productId,
      URLs.PRODUCTS_ATTRIBUTES,
      '/',
      attributeId,
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

export const useDeleteAttribute = (productId: string) => {
  return useMutation({
    mutationFn: (attributeId: string) =>
      deleteAttribute({ productId, attributeId }),
  })
}

