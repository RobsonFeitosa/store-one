import { api } from '@/utils/handleClient'
import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useQuery } from '@tanstack/react-query'
import { ITimeDiscountDTO } from '../dtos/timeDiscount.dto'

const getTimeDiscount = async (timeDiscountId: string) => {
  try {
    const response = await api.get(
      urlBuilder({
        address: [URLs.TIME_DISCOUNT, '/', timeDiscountId].join(''),
      }),
    )

    return response.data as ITimeDiscountDTO
  } catch (error) {
    console.error(error)
  }
}

export const useGetTimeDiscount = (timeDiscountId: string) => {
  return useQuery({
    queryKey: ['getTimeDiscount'],
    queryFn: () => getTimeDiscount(timeDiscountId),
    enabled: false,
  })
}

