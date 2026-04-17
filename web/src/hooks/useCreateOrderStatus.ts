import { ICreateOrderStatusDTO } from '@/pages/dtos/orders.dto'
import { api } from '@/utils/handleClient'
import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useMutation } from '@tanstack/react-query'
import { ToastMessage, useToast } from './providers/toast'

interface CreateOrderStatusProps {
  payload: ICreateOrderStatusDTO
  addToast: (message: Omit<ToastMessage, 'id'>) => void
}

const createOrderStatus = async ({
  payload,
  addToast,
}: CreateOrderStatusProps) => {
  try {
    const response = await api.post(
      urlBuilder({
        address: [URLs.ORDERS, URLs.ORDERS_STATUS].join(''),
      }),
      {
        name: payload.name,
        order_id: payload.order_id,
      },
    )

    addToast({
      type: 'info',
      title: 'Cliente informado',
      description:
        'Foi disparado um e-mail informando o andamento de seu pedido para o cliente',
    })

    return response
  } catch (error) {
    console.error(error)
  }
}

export const useCreateOrderStatus = () => {
  const { addToast } = useToast()

  return useMutation({
    mutationFn: (payload: ICreateOrderStatusDTO) =>
      createOrderStatus({ payload, addToast }),
  })
}
