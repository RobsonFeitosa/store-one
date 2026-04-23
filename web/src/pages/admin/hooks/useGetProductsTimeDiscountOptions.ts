import { api } from '@/utils/handleClient'
import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useQuery } from '@tanstack/react-query'
import { IOptionsDTO, useBuilderUrl } from '../hooks_generic/useBuilderUrl'
import { OptionProductsTimeDiscount } from '@/pages/admin/dtos/timeDiscount.dto'

const getProductsTimeDiscountOptions = async (url: string) => {
  try {
    const response = await api.get(
      urlBuilder({
        address: url,
      }),
    )

    return response.data.result as OptionProductsTimeDiscount[]
  } catch (error) {
    console.error(error)
  }
}
// useGetOptionsProductsTimeDiscount
export const useGetProductsTimeDiscountOptions = (options?: IOptionsDTO) => {
  const uri = [URLs.TIME_DISCOUNT, URLs.PRODUCTS_OPTIONS_PRODUCTS].join('')
  const { url } = useBuilderUrl(uri, options)

  return useQuery({
    queryKey: ['getProductsTimeDiscountOptions'],
    queryFn: () => getProductsTimeDiscountOptions(url),
    enabled: false,
  })
}

