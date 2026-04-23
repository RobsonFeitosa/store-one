import { api } from '@/utils/handleClient'
import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useQuery } from '@tanstack/react-query'
import { IOptionsDTO, useBuilderUrl } from '../hooks_generic/useBuilderUrl'
import { ITimeDiscountDTO } from '@/pages/admin/dtos/timeDiscount.dto'

const getAllTimeDiscounts = async (url: string) => {
  try {
    const response = await api.get(
      urlBuilder({
        address: url,
      }),
    )

    return response.data as [ITimeDiscountDTO[], number]
  } catch (error) {
    console.error(error)
  }
}

export const useGetAllTimeDiscount = (options?: IOptionsDTO) => {
  const uri = [URLs.TIME_DISCOUNT].join('')
  const { url } = useBuilderUrl(uri, options)

  return useQuery({
    queryKey: ['getAllTimeDiscounts'],
    queryFn: () => getAllTimeDiscounts(url),
    enabled: false,
  })
}

