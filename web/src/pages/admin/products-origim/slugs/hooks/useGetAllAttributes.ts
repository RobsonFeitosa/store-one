import { api } from '@/utils/handleClient'
import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useQuery } from '@tanstack/react-query'
import { IPaginationOptionDTO } from '@/pages/admin/dtos/paginationOption.dto'
import { useBuilderUrl } from '@/hooks/useBuilderUrl'
import { IAttributeDTO } from '@/pages/admin/dtos/attribute.dto'

const getAllAttributes = async (url: string) => {
  try {
    const response = await api.get(
      urlBuilder({
        address: url,
      }),
    )

    return response.data as [IAttributeDTO[], number]
  } catch (error) {
    console.error(error)
  }
}

export const useGetAllAttributes = (
  productId: string,
  options?: IPaginationOptionDTO,
) => {
  const productUri = [
    URLs.PRODUCTS,
    '/',
    productId,
    URLs.PRODUCTS_ATTRIBUTES,
  ].join('')

  const { url } = useBuilderUrl(productUri, options)

  return useQuery({
    queryKey: ['getAllAttributes'],
    queryFn: () => getAllAttributes(url),
    enabled: false,
  })
}

