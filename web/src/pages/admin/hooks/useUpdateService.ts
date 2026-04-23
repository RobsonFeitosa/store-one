import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useMutation } from '@tanstack/react-query'
import { api } from '@/utils/handleClient'
import { ICreateServiceDTO } from '../schedules/dtos/service.dto'
import { CreateArchiveProps, useCreateArchive } from '@/hooks/useCreateArchive'

interface UpdateServiceProps {
  payload: ICreateServiceDTO
  serviceId: string | null
  savedImageArchive: (image: CreateArchiveProps) => void
}

const updateService = async ({
  payload,
  serviceId,
  savedImageArchive,
}: UpdateServiceProps) => {
  if (!serviceId) {
    return
  }

  const { images, image_primary, ...rest } = payload

  try {
    const response = await api.put(
      urlBuilder({
        address: [URLs.SCHEDULES, URLs.SCHEDULES_SERVICES, '/', serviceId].join(
          '',
        ),
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

export const useUpdateService = (serviceId: string | null) => {
  const { mutateAsync: createArchiveAsync } = useCreateArchive()

  function savedImageArchive(data: CreateArchiveProps) {
    createArchiveAsync(data)
  }

  return useMutation({
    mutationFn: (payload: ICreateServiceDTO) =>
      updateService({ payload, serviceId, savedImageArchive }),
  })
}

