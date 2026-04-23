import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useMutation } from '@tanstack/react-query'
import { api } from '@/utils/handleClient'
import { ICreateServiceDTO } from '../schedules/dtos/service.dto'
import { CreateArchiveProps, useCreateArchive } from '@/hooks/useCreateArchive'

interface CreateServiceProps {
  payload: ICreateServiceDTO
  savedImageArchive: (image: CreateArchiveProps) => void
}

const createService = async ({
  payload,
  savedImageArchive,
}: CreateServiceProps) => {
  const { images, image_primary, ...rest } = payload

  try {
    const response = await api.post(
      urlBuilder({
        address: [URLs.SCHEDULES, URLs.SCHEDULES_SERVICES].join('/'),
      }),
      rest,
    )

    if (response.status === 200) {
      if (image_primary) {
        savedImageArchive({
          images: [image_primary],
          nameOrigin: 'service',
          referenceId: response.data.id,
        })
      }
      if (images) {
        savedImageArchive({
          images,
          nameOrigin: 'service',
          referenceId: response.data.id,
        })
      }
    }

    return response
  } catch (error) {
    console.error(error)
  }
}

export const useCreateService = () => {
  const { mutateAsync: createArchiveAsync } = useCreateArchive()

  function savedImageArchive(data: CreateArchiveProps) {
    createArchiveAsync(data)
  }

  return useMutation({
    mutationFn: (payload: ICreateServiceDTO) =>
      createService({ payload, savedImageArchive }),
  })
}

