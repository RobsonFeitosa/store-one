import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useMutation } from '@tanstack/react-query'
import { api } from '@/utils/handleClient'
import { IAttributeDTO } from '@/pages/admin/dtos/attribute.dto'

interface UpdateAttributeProps {
  productId: string
  attributeId: string
  payload: IAttributeDTO
}

const updateAttribute = async ({
  payload,
  productId,
  attributeId,
}: UpdateAttributeProps) => {
  try {
    const uri = [
      URLs.PRODUCTS,
      '/',
      productId,
      URLs.PRODUCTS_ATTRIBUTES,
      '/',
      attributeId,
    ].join('')

    const response = await api.put(
      urlBuilder({
        address: uri,
      }),
      payload,
    )

    return response
  } catch (error) {
    console.error(error)
  }
}

export const useUpdateAttribute = (productId: string, attributeId: string) => {
  return useMutation({
    mutationFn: (payload: IAttributeDTO) =>
      updateAttribute({ payload, productId, attributeId }),
  })
}

