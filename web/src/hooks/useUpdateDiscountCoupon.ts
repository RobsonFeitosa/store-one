import { api } from '@/utils/handleClient'
import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useMutation } from '@tanstack/react-query'
import { ToastMessage, useToast } from './providers/toast'

interface UpdateDiscountCouponProps {
  code: string
  addToast: (message: Omit<ToastMessage, 'id'>) => void
}

const updateDiscountCoupon = async ({
  code,
  addToast,
}: UpdateDiscountCouponProps) => {
  try {
    const response = await api.put(
      urlBuilder({
        address: URLs.COUPON,
      }),
      {
        status: 'used',
        code,
      },
    )

    return response
  } catch (error: any) {
    if (error?.response.data.message === 'Coupon has already been used') {
      addToast({
        type: 'info',
        title: 'Cupom já utilizado',
        description: 'Cupom já foi usado antes.',
      })
    }
    if (error?.response.data.message === 'Invalid coupon') {
      addToast({
        type: 'info',
        title: 'Cupom invalido',
        description: 'Cupom invalido.',
      })
    }

    if (error?.response.data.message === 'Coupon not found') {
      addToast({
        type: 'info',
        title: 'Cupom não encontrado',
        description: 'Cupom não existe no sistema',
      })
    }

    if (error?.response.data.message === 'Coupon expired') {
      addToast({
        type: 'info',
        title: 'Cupom expirado',
        description: 'Cupom já passou da data de validade',
      })
    }
  }
}

export const useUpdateDiscountCoupon = () => {
  const { addToast } = useToast()

  return useMutation({
    mutationFn: (code: string) => updateDiscountCoupon({ code, addToast }),
  })
}
