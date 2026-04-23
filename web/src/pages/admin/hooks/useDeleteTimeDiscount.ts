import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useMutation } from '@tanstack/react-query'
import { api } from '@/utils/handleClient'

interface DeleteTimeDiscountProps {
  timeDiscountId: string
}

const deleteTimeDiscount = async ({
  timeDiscountId,
}: DeleteTimeDiscountProps) => {
  try {
    const uri = [URLs.TIME_DISCOUNT, '/', timeDiscountId].join('')

    const response = await api.delete(
      urlBuilder({
        address: uri,
      }),
    )

    return response
  } catch (error) {
    console.error(error)
  }
}

export const useDeleteTimeDiscount = (timeDiscountId: string) => {
  return useMutation({
    mutationFn: () => deleteTimeDiscount({ timeDiscountId }),
  })
}

