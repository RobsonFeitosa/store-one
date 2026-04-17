import { api } from '@/utils/handleClient'
import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useQuery } from '@tanstack/react-query'
import { IProductDTO, TypeProduct } from '@/pages/dtos/product.dto'
import { IOptionsDTO, useBuilderUrl } from '@/hooks/useBuilderUrl'

interface UserGetProductsProps {
  options: IOptionsDTO
  userId?: string
  onlyDiscount?: boolean
  type?: TypeProduct
}

const getProductsTopCategories = async (url: string) => {
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

export const useGetProductsTopCategories = (data: UserGetProductsProps) => {
  const { options, ...rest } = data

  // TODO: CRIAR QUERY PARA BUSCAR OS PRODUTOS MAIS VENDIDOS POR CATEGORIA
  const { url } = useBuilderUrl(URLs.PRODUCTS, options, {
    ...rest,
  })

  return useQuery({
    queryKey: ['getProductsTopCategories'],
    queryFn: () => getProductsTopCategories(url),
    enabled: false,
  })
}
