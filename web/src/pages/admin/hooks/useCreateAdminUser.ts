import { ToastMessage, useToast } from '@/hooks/providers/toast'
import { api } from '@/utils/handleClient'
import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export interface ICreateAdminUser {
  name: string
  email: string
  password?: string
  role?: 'customer' | 'shopkeeper'
  actived?: boolean
}

const createAdminUser = async (
  payload: ICreateAdminUser,
  addToast: (message: Omit<ToastMessage, 'id'>) => void,
) => {
  const response = await api
    .post(
      urlBuilder({
        address: URLs.USERS,
      }),
      payload,
    )
    .then((response) => {
      if (response?.status === 201) {
        addToast({
          type: 'success',
          title: 'Usuário cadastrado',
          description: 'O usuário foi cadastrado com sucesso.',
        })
      }

      return response.data
    })
    .catch((err) => {
      if (err?.response?.status === 400 || err?.response?.status === 409) {
        addToast({
          type: 'error',
          title: 'Usuário já existe',
          description: 'Não foi possivel criar a conta de usuário. E-mail já em uso.',
        })
      } else {
        addToast({
          type: 'error',
          title: 'Erro',
          description: 'Ocorreu um erro ao criar o usuário.',
        })
      }

      throw err
    })

  return response
}

export const useCreateAdminUser = () => {
  const { addToast } = useToast()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payloadEntry: ICreateAdminUser) =>
      createAdminUser(payloadEntry, addToast),
    onSuccess: (_, variables) => {
      if (variables.role === 'customer') {
        queryClient.invalidateQueries({ queryKey: ['getCustomers'] })
      } else if (variables.role === 'shopkeeper') {
        queryClient.invalidateQueries({ queryKey: ['getShopkeepers'] })
      } else {
        queryClient.invalidateQueries({ queryKey: ['getUsers'] })
      }
    },
  })
}
