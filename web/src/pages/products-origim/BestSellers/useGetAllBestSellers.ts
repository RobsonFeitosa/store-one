import { api } from '@/utils/handleClient'
import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useQuery } from '@tanstack/react-query'
import { IProductDTO, TypeProduct } from '@/pages/dtos/product.dto'
import { IOptionsDTO, useBuilderUrl } from '@/hooks/useBuilderUrl'

interface UserGetProductsBestSellerProps {
  options: IOptionsDTO
  userId?: string
  onlyDiscount?: boolean
  type?: TypeProduct
}

const getProductsBestSeller = async (url: string) => {
  try {
    const response = await api.get(
      urlBuilder({
        address: url,
      }),
    )

    return response.data as [IProductDTO[], number]
  } catch (error) {
    console.error(error)
  }
}

export const useGetAllBestSellers = (data: UserGetProductsBestSellerProps) => {
  const { options, ...rest } = data

  const { url } = useBuilderUrl(URLs.PRODUCTS, options, {
    ...rest,
  })

  return useQuery({
    queryKey: ['getProductsBestSeller'],
    queryFn: () => getProductsBestSeller(url),
    enabled: false,
  })
}
