import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useMutation } from '@tanstack/react-query'
import { api } from '@/utils/handleClient'

interface UpdateImages {
  isPrimary: boolean
  referenceId: string
  originName: string
}

interface IUpdatePayloadImages {
  images: File[]
  payload: UpdateImages
}

const createUpdateImagesProduct = async (data: IUpdatePayloadImages) => {
  try {
    const formData = new FormData()

    for (const image of data.images) {
      formData.append('images', image)
    }

    formData.append('data', JSON.stringify(data.payload))

    const response = await api.post(
      urlBuilder({
        address: URLs.ARCHIVE,
      }),
      formData,
    )

    return response
  } catch (error: any) {
    console.error(error)
  }
}

export const useCreateUpdateImagesProduct = () => {
  return useMutation({
    mutationFn: (data: IUpdatePayloadImages) => createUpdateImagesProduct(data),
  })
}

