import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useMutation } from '@tanstack/react-query'
import { api } from '@/utils/handleClient'
import { ICreateVariationDTO } from '@/pages/admin/dtos/variation.dto'
import { CreateArchiveProps, useCreateArchive } from '@/hooks/useCreateArchive'

interface CreateAttributeProps {
  attributeId: string
  payload: ICreateVariationDTO
  savedImageArchive: (image: CreateArchiveProps) => void
}

const createVariation = async ({
  payload,
  attributeId,
  savedImageArchive,
}: CreateAttributeProps) => {
  try {
    const uri = [
      URLs.PRODUCTS,
      URLs.PRODUCTS_ATTRIBUTES,
      '/',
      attributeId,
      URLs.PRODUCTS_VARIATIONS,
    ].join('')

    const { image, ...rest } = payload

    const response = await api.post(
      urlBuilder({
        address: uri,
      }),
      rest,
    )

    if (response.status === 200) {
      if (image) {
        savedImageArchive({
          images: [image],
          nameOrigin: 'product_variation',
          referenceId: response.data.id,
        })
      }
    }

    return response
  } catch (error) {
    console.error(error)
  }
}

export const useCreateVariation = (attributeId: string) => {
  const { mutateAsync: createArchiveAsync } = useCreateArchive()

  function savedImageArchive(data: CreateArchiveProps) {
    createArchiveAsync(data)
  }

  return useMutation({
    mutationFn: (payload: ICreateVariationDTO) =>
      createVariation({ payload, attributeId, savedImageArchive }),
  })
}

