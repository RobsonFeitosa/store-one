import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useMutation } from '@tanstack/react-query'
import { api } from '@/utils/handleClient'
import { ToastMessage, useToast } from '@/hooks/providers/toast'

interface DeleteProductOfTimeDiscountProps {
  productId: string
  addToast: (message: Omit<ToastMessage, 'id'>) => void
}

const deleteProductOfTimeDiscount = async ({
  productId,
  addToast,
}: DeleteProductOfTimeDiscountProps) => {
  try {
    const uri = [URLs.PROFESSIONALS_TIME_INTERVALS, '/', productId].join('')

    const response = await api.patch(
      urlBuilder({
        address: uri,
      }),
    )

    return response
  } catch (error: any) {
    if (error?.response?.data?.message) {
      addToast({
        type: 'info',
        title: 'Produto nao removido',
        description:
          'Esse é o único produto relacionado ao desconto temporal, exclua o desconto temporal para remover',
      })
    }
    console.error(error)
  }
}

export const useDeleteProdutOfTimeDiscount = (productId: string) => {
  const { addToast } = useToast()

  return useMutation({
    mutationFn: () => deleteProductOfTimeDiscount({ productId, addToast }),
  })
}

