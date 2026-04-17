import { api } from '@/utils/handleClient'
import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useQuery } from '@tanstack/react-query'
import { IProductDTO } from '@/pages/dtos/product.dto'
import { IOptionsDTO, useBuilderUrl } from '@/hooks/useBuilderUrl'

interface UserGetProductsProps {
  options: IOptionsDTO
  userId?: string
}

const getAllProductsOnlyDiscount = async (url: string) => {
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

export const useGetAllProductsOnlyDiscount = (data: UserGetProductsProps) => {
  const { options, ...rest } = data

  const { url } = useBuilderUrl(URLs.PRODUCTS, options, {
    ...rest,
    onlyDiscount: true,
    type: 'product',
  })

  return useQuery({
    queryKey: ['getAllProductsOnlyDiscount'],
    queryFn: () => getAllProductsOnlyDiscount(url),
    enabled: false,
  })
}
