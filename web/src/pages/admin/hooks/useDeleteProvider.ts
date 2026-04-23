import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useMutation } from '@tanstack/react-query'
import { api } from '@/utils/handleClient'

interface DeleteProviderProps {
  providerId: string
}

const deleteProvider = async ({ providerId }: DeleteProviderProps) => {
  try {
    const uri = [URLs.PRODUCTS, URLs.PRODUCTS_PROVIDERS, '/', providerId].join(
      '',
    )

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

export const useDeleteProvider = (providerId: string) => {
  return useMutation({
    mutationFn: () => deleteProvider({ providerId }),
  })
}

