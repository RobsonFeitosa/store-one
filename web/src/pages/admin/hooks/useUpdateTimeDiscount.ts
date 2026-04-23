import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useMutation } from '@tanstack/react-query'
import { api } from '@/utils/handleClient'
import { ICreateTimeDiscountDTO } from '../dtos/timeDiscount.dto'

interface CreateTimeDiscountProps {
  timeDiscountId: string
  payload: ICreateTimeDiscountDTO
}

const updateProvider = async ({
  payload,
  timeDiscountId,
}: CreateTimeDiscountProps) => {
  try {
    const response = await api.put(
      urlBuilder({
        address: [URLs.TIME_DISCOUNT, '/', timeDiscountId].join(''),
      }),
      payload,
    )

    return response
  } catch (error) {
    console.error(error)
  }
}

export const useUpdateTimeDiscount = (timeDiscountId: string) => {
  return useMutation({
    mutationFn: (payload: ICreateTimeDiscountDTO) =>
      updateProvider({ payload, timeDiscountId }),
  })
}

