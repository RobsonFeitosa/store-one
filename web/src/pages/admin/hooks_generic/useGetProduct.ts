import { api } from '@/utils/handleClient'
import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useQuery } from '@tanstack/react-query'
import { IProductDTO } from '@/pages/admin/dtos/product.dto'

export const getProduct = async (slug: string, productId: string) => {
  try {
    const response = await api.get(
      urlBuilder({
        address: [URLs.PRODUCTS, slug, 'code', productId].join('/'),
      }),
    )
    return response.data.result as IProductDTO
  } catch (err) {
    console.error(err)
  }
}

export const useGetProduct = (slug: string, productId: string) => {
  return useQuery({
    queryKey: ['getProduct', productId, slug],
    queryFn: async () => getProduct(slug, productId),
    enabled: false,
  })
}

