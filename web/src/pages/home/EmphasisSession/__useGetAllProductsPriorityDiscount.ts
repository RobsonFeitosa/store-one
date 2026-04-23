import { api } from '@/utils/handleClient'
import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useQuery } from '@tanstack/react-query'
import { IProductDTO } from '@/pages/dtos/product.dto'
import { IOptionsDTO, useBuilderUrl } from '@/hooks/useBuilderUrl'

interface UserGetProductsProps {
  options: IOptionsDTO
  userId?: string
}

const getAllProductsPriorityDiscount = async (url: string) => {
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

export const useGetAllProductsPriorityDiscount = (
  data: UserGetProductsProps,
) => {
  const { options, ...rest } = data

  const { url } = useBuilderUrl(URLs.PRODUCTS, options, {
    ...rest,
    type: 'product',
    timeDiscountPriory: true,
  })

  return useQuery({
    queryKey: ['getAllProductsPriorityDiscount'],
    queryFn: () => getAllProductsPriorityDiscount(url),
    enabled: false,
  })
}
