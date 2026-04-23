import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useMutation } from '@tanstack/react-query'
import { api } from '@/utils/handleClient'
import { ToastMessage, useToast } from '@/hooks/providers/toast'

interface DeleteProductProps {
  productId: string
  addToast: (message: Omit<ToastMessage, 'id'>) => void
}

const deleteProduct = async ({ productId, addToast }: DeleteProductProps) => {
  try {
    const response = await api.delete(
      urlBuilder({
        address: [URLs.PRODUCTS, productId].join('/'),
      }),
    )

    if (response.status === 200) {
      addToast({
        type: 'success',
        title: 'Produto na lixeira',
      })
    }

    return response
  } catch (error: any) {
    if (error) {
      addToast({
        type: 'error',
        title: 'Error interno',
      })
    }
    console.error(error)
  }
}

export const useSoftDeleteProduct = (productId: string) => {
  const { addToast } = useToast()
  return useMutation({
    mutationFn: () => deleteProduct({ addToast, productId }),
  })
}

