import { api } from '@/utils/handleClient'
import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useQuery } from '@tanstack/react-query'
import { IOptionsDTO, useBuilderUrl } from './useBuilderUrl'
import { IProductDTO, TypeProduct } from '@/pages/admin/dtos/product.dto'

interface UserGetProductsProps {
  options: IOptionsDTO
  userId?: string
  onlyDiscount?: boolean
  type?: TypeProduct
  name?: string
  quantity?: number
  weight?: number
  priceMin?: number
  priceMax?: number
  current?: boolean
  alphabeticalASC?: boolean
  alphabeticalDESC?: boolean
  highPrice?: boolean
  lowPrice?: boolean
  old?: boolean
}

const getProducts = async (url: string) => {
  try {
    const response = await api.get(
      urlBuilder({
        address: url,
      }),
    )

    return response.data.result as [IProductDTO[], number]
  } catch (error) {
    console.error(error)
  }
}


export const useGetAllProducts = (data: UserGetProductsProps) => {
  const { options, ...rest } = data

  const { url } = useBuilderUrl(URLs.PRODUCTS, options, {
    ...rest,
  })
  return useQuery({
    queryKey: ['getProducts', rest.type],
    queryFn: () => getProducts(url),
    enabled: false,
  })
}




export { getProducts }