import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useMutation } from '@tanstack/react-query'
import { api } from '@/utils/handleClient'

interface CreateAttributeProps {
  archiveId: string
}

const deleteArchive = async ({ archiveId }: CreateAttributeProps) => {
  try {
    const uri = [URLs.ARCHIVE, '/', archiveId].join('')

    const response = await api.delete(
      urlBuilder({
        address: uri,
      }),
    )

    return response
  } catch (error) {
    console.error(error)
  }
}

export const useDeleteArchive = () => {
  return useMutation({
    mutationFn: (archiveId: string) => deleteArchive({ archiveId }),
  })
}

