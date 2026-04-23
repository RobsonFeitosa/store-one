import { api } from '@/utils/handleClient'
import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useMutation } from '@tanstack/react-query'
import { IOptionsDTO, useBuilderUrl } from './useBuilderUrl'

const updateWish = async (url: string, productId: string) => {
  try {
    const response = await api.post(
      urlBuilder({
        address: [url, productId].join('/'),
      }),
    )

    return response
  } catch (error) {
    console.error(error)
  }
}

export const useUpdateWishProduct = (options?: IOptionsDTO) => {
  const uri = [URLs.PRODUCTS, URLs.PRODUCTS_WISH].join('')
  const { url } = useBuilderUrl(uri, options)

  return useMutation({
    mutationFn: (productId: string) => updateWish(url, productId),
  })
}

