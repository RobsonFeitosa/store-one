import { api } from '@/utils/handleClient'
import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useMutation } from '@tanstack/react-query'

export interface UpdateArchiveProps {
  image: File
  archiveId: string
  payload?: {
    originName?: string
    referenceId?: string
    isPrimary?: boolean
  }
}

const updateArchive = async ({
  image,
  archiveId,
  payload,
}: UpdateArchiveProps) => {
  const url = [URLs.ARCHIVE, '/', archiveId].join('')

  const formDataArchive = new FormData()

  formDataArchive.append('image', image)
  if (payload) {
    formDataArchive.append('data', JSON.stringify(payload))
  }

  try {
    const response = await api.put(
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

export const useUpdateArchive = () => {
  return useMutation({
    mutationFn: (payload: UpdateArchiveProps) => updateArchive(payload),
  })
}

