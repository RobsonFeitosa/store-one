import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useMutation } from '@tanstack/react-query'
import { api } from '@/utils/handleClient'
import { ICreateProviderDTO } from '../dtos/providers.dto'
import { CreateArchiveProps, useCreateArchive } from '@/hooks/useCreateArchive'

interface CreateProviderProps {
  payload: ICreateProviderDTO
  savedImageArchive: (image: CreateArchiveProps) => void
}

const createProvider = async ({
  payload,
  savedImageArchive,
}: CreateProviderProps) => {
  try {
    const { image, ...rest } = payload
    const response = await api.post(
      urlBuilder({
        address: [URLs.PRODUCTS, URLs.PRODUCTS_PROVIDERS].join(''),
      }),
      rest,
    )

    if (image) {
      savedImageArchive({
        images: [image],
        nameOrigin: 'product_providers',
        referenceId: response.data.id,
      })
    }

    return response
  } catch (error) {
    console.error(error)
  }
}

export const useCreateProvider = (onRefetch?: () => void) => {
  const { mutateAsync: createArchiveAsync } = useCreateArchive()

  function savedImageArchive(data: CreateArchiveProps) {
    createArchiveAsync(data).then((response) => {
      if (response?.status === 200) {
        onRefetch && onRefetch()
      }
    })
  }

  return useMutation({
    mutationFn: (payload: ICreateProviderDTO) =>
      createProvider({ payload, savedImageArchive }),
  })
}

