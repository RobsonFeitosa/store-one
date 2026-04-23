import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useMutation } from '@tanstack/react-query'
import { api } from '@/utils/handleClient'
import { ICreateVariationDTO } from '@/pages/admin/dtos/variation.dto'
import { UpdateArchiveProps, useUpdateArchive } from '@/hooks/useUpdateArchive'

interface UpdateVariationProps {
  variationId: string
  attributeId: string
  payload: ICreateVariationDTO
  savedImageArchive: (image: UpdateArchiveProps) => void
}

const updateVariation = async ({
  payload,
  attributeId,
  variationId,
  savedImageArchive,
}: UpdateVariationProps) => {
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

    const { image, ...rest } = payload

    const response = await api.put(
      urlBuilder({
        address: uri,
      }),
      rest,
    )

    if (response.status === 200) {
      if (image) {
        savedImageArchive({
          image,
          archiveId: response.data.image.id,
        })
      }
    }

    return response
  } catch (error) {
    console.error(error)
  }
}

export const useUpdateVariation = (
  attributeId: string,
  variationId: string,
) => {
  const { mutateAsync: updateArchiveAsync } = useUpdateArchive()

  function savedImageArchive(data: UpdateArchiveProps) {
    updateArchiveAsync(data)
  }

  return useMutation({
    mutationFn: (payload: ICreateVariationDTO) =>
      updateVariation({
        payload,
        variationId,
        attributeId,
        savedImageArchive,
      }),
  })
}

