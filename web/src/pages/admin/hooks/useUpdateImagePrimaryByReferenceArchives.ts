import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useMutation } from '@tanstack/react-query'
import { api } from '@/utils/handleClient'

interface UpdateAttributeProps {
  productId: string
  archiveId: string
}

const updateImagePrimary = async ({
  productId,
  archiveId,
}: UpdateAttributeProps) => {
  try {
    const uri = [
      URLs.ARCHIVE,
      '/',
      archiveId,
      URLs.ARCHIVE_REFERENCE,
      '/',
      productId,
    ].join('')

    const response = await api.patch(
      urlBuilder({
        address: uri,
      }),
    )

    return response
  } catch (error) {
    console.error(error)
  }
}

export const useUpdateImagePrimaryByReferenceArchives = (productId: string) => {
  return useMutation({
    mutationFn: (archiveId: string) =>
      updateImagePrimary({ archiveId, productId }),
  })
}

