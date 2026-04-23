import { api } from '@/utils/handleClient'
import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useMutation } from '@tanstack/react-query'
import { ToastMessage, useToast } from './providers/toast'

interface VerifyCouponProps {
  uri: string
  code: string
  addToast: (message: Omit<ToastMessage, 'id'>) => void
}

function hasPassedDateValid(dataValid: Date): boolean {
  const now = new Date().getTime()
  const valid = new Date(dataValid).getTime()

  return valid < now
}

const verifyCoupon = async ({ uri, code, addToast }: VerifyCouponProps) => {
  try {
    const response = await api.get(
      urlBuilder({
        address: [uri, code].join('/'),
      }),
    )

    if (response.data) {
      const { status, validation } = response.data

      if (status === 'used') {
        addToast({
          type: 'info',
          title: 'Cupom já utilizado',
          description: 'Cupom já foi usado antes.',
        })
      }

      if (status === 'invalid') {
        addToast({
          type: 'info',
          title: 'Cupom invalido',
          description: 'Cupom invalido.',
        })
      }

      if (hasPassedDateValid(validation)) {
        addToast({
          type: 'info',
          title: 'Cupom expirado',
          description: 'Cupom já passou da data de validade',
        })
      }
    }

    return response
  } catch (error) {
    console.error(error)

    addToast({
      type: 'info',
      title: 'Cupom não encontrado',
      description: 'Cupom não existe no sistema',
    })
  }
}

export const useVerifyCoupon = () => {
  const { addToast } = useToast()
  const uri = [URLs.COUPON, URLs.COUPON_CODE].join('')

  return useMutation({
    mutationFn: (code: string) => verifyCoupon({ uri, code, addToast }),
  })
}

