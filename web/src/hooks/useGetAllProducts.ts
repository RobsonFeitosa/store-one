import { api } from '@/utils/handleClient'
import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useQuery } from '@tanstack/react-query'
import { IOptionsDTO, useBuilderUrl } from './useBuilderUrl'
import { IProductDTO, TypeProduct } from '@/pages/dtos/product.dto'

interface UserGetProductsProps {
  options: IOptionsDTO
  userId?: string
  onlyDiscount?: boolean
  type?: TypeProduct
  productIds?: string
  timeDiscountPriory?: boolean
  categoryId?: string
}

const getProducts = async (url: string) => {
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

export const useGetAllProducts = (data: UserGetProductsProps, key?: string) => {
  const { options, ...rest } = data

  const { url } = useBuilderUrl(URLs.PRODUCTS, options, {
    ...rest,
  })

  return useQuery({
    queryKey: ['getProducts', key],
    queryFn: () => getProducts(url),
    enabled: false,
  })
}
