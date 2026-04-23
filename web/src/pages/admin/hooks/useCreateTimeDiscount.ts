import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useMutation } from '@tanstack/react-query'
import { api } from '@/utils/handleClient'
import { ICreateTimeDiscountDTO } from '../dtos/timeDiscount.dto'

interface CreateTimeDiscountProps {
  payload: ICreateTimeDiscountDTO
}

const createProvider = async ({ payload }: CreateTimeDiscountProps) => {
  try {
    const response = await api.post(
      urlBuilder({
        address: [URLs.TIME_DISCOUNT].join(''),
      }),
      payload,
    )

    return response
  } catch (error) {
    console.error(error)
  }
}

export const useCreateTimeDiscount = () => {
  return useMutation({
    mutationFn: (payload: ICreateTimeDiscountDTO) =>
      createProvider({ payload }),
  })
}

