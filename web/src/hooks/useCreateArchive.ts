import { api } from '@/utils/handleClient'
import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useMutation } from '@tanstack/react-query'

export interface CreateArchiveProps {
  images: File[]
  nameOrigin: string
  referenceId: string
}

const createArchive = async ({
  images,
  nameOrigin,
  referenceId,
}: CreateArchiveProps) => {
  const url = [URLs.ARCHIVE, '/', nameOrigin, '/', referenceId].join('')

  const formDataArchive = new FormData()

  for (const image of images) {
    formDataArchive.append('images', image)
  }

  try {
    const response = await api.post(
      urlBuilder({
        address: url,
      }),
      formDataArchive,
    )

    return response
  } catch (error) {
    console.error(error)
  }
}

export const useCreateArchive = () => {
  return useMutation({
    mutationFn: (payload: CreateArchiveProps) => createArchive(payload),
  })
}
