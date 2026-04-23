import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useMutation } from '@tanstack/react-query'
import { api } from '@/utils/handleClient'
import { ICreateAttributeDTO } from '@/pages/admin/dtos/attribute.dto'

interface CreateAttributeProps {
  productId: string
  payload: ICreateAttributeDTO
}

const createAttribute = async ({
  payload,
  productId,
}: CreateAttributeProps) => {
  try {
    const uri = [URLs.PRODUCTS, '/', productId, URLs.PRODUCTS_ATTRIBUTES].join(
      '',
    )

    const response = await api.post(
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

export const useCreateAttribute = (productId: string) => {
  return useMutation({
    mutationFn: (payload: ICreateAttributeDTO) =>
      createAttribute({ payload, productId }),
  })
}

