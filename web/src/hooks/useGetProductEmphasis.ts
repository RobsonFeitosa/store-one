import { api } from '@/utils/handleClient'
import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useQuery } from '@tanstack/react-query'
import { IProductDTO } from '@/pages/dtos/product.dto'

const getProductEmphasis = async () => {
  try {
    const response = await api.get(
      urlBuilder({
        address: [URLs.PRODUCTS, URLs.PRODUCTS_EMPHASIS].join(''),
      }),
    )

    return response.data.result as IProductDTO
  } catch (error) {
    console.error(error)
  }
}

export const useGetProductEmphasis = () => {
  return useQuery({
    queryKey: ['getProductEmphasis'],
    queryFn: () => getProductEmphasis(),
    enabled: false,
  })
}
