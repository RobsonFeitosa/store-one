import { api } from '@/utils/handleClient'
import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useQuery } from '@tanstack/react-query'
import { IProductDTO } from '@/pages/dtos/product.dto'

const getProduct = async (slug: string, productId: string) => {
  try {
    const response = await api.get(
      urlBuilder({
        address: [URLs.PRODUCTS, slug, 'code', productId].join('/'),
      }),
    )

    return response.data.result as IProductDTO
  } catch (error) {
    console.error(error)
  }
}

export const useGetProduct = (slug: string, productId: string) => {
  return useQuery({
    queryKey: ['getProduct'],
    queryFn: () => getProduct(slug, productId),
    enabled: false,
  })
}
