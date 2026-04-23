import { api } from '@/utils/handleClient'
import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useMutation } from '@tanstack/react-query'

export interface UpdateArchiveProps {
  archiveId: string
  referenceId: string
}

const updateArchive = async ({
  archiveId,
  referenceId,
}: UpdateArchiveProps) => {
  const url = [
    URLs.ARCHIVE,
    '/',
    archiveId,
    URLs.ARCHIVE_REFERENCE,
    '/',
    referenceId,
  ].join('')

  try {
    const response = await api.patch(
      urlBuilder({
        address: url,
      }),
    )

    return response
  } catch (error) {
    console.error(error)
  }
}

export const useUpdatePrimaryArchive = () => {
  return useMutation({
    mutationFn: (payload: UpdateArchiveProps) => updateArchive(payload),
  })
}

