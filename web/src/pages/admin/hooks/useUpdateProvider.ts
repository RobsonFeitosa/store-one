import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useMutation } from '@tanstack/react-query'
import { api } from '@/utils/handleClient'
import { ICreateProviderDTO } from '../dtos/providers.dto'
import { UpdateArchiveProps, useUpdateArchive } from '@/hooks/useUpdateArchive'

interface UpdateProviderProps {
  payload: ICreateProviderDTO
  providerId: string
  savedImageArchive: (image: UpdateArchiveProps) => void
}

const updateProvider = async ({
  payload,
  providerId,
  savedImageArchive,
}: UpdateProviderProps) => {
  try {
    const { image, ...rest } = payload
    const response = await api.put(
      urlBuilder({
        address: [URLs.PRODUCTS, URLs.PRODUCTS_PROVIDERS, '/', providerId].join(
          '',
        ),
      }),
      rest,
    )

    if (image) {
      savedImageArchive({
        image,
        archiveId: response.data.image.id,
      })
    }

    return response
  } catch (error) {
    console.error(error)
  }
}

export const useUpdateProvider = (
  providerId: string,
  onRefetch?: () => void,
) => {
  const { mutateAsync: updateArchiveAsync } = useUpdateArchive()

  function savedImageArchive(data: UpdateArchiveProps) {
    updateArchiveAsync(data).then((response) => {
      if (response?.status === 200) {
        onRefetch && onRefetch()
      }
    })
  }

  return useMutation({
    mutationFn: (payload: ICreateProviderDTO) =>
      updateProvider({ payload, providerId, savedImageArchive }),
  })
}

