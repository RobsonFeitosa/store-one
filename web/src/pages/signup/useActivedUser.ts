import { ToastMessage, useToast } from '@/hooks/providers/toast'
import { api } from '@/utils/handleClient'
import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useMutation } from '@tanstack/react-query'

interface IActivedUsers {
  token: string
}

const activedUsers = async (
  payload: IActivedUsers,
  addToast: (message: Omit<ToastMessage, 'id'>) => void,
) => {
  try {
    const response = await api
      .post(
        urlBuilder({
          address: URLs.USERS_ACTIVED,
        }),
        { token: payload.token },
      )
      .then((response) => {
        if (response?.status === 200) {
          addToast({
            type: 'success',
            title: 'Usuário ativado',
            description: 'Seu usuário foi ativado com sucesso.',
          })
        }

        return response.data
      })
      .catch((err) => {
        if (err?.response.status === 500) {
          addToast({
            type: 'error',
            title: 'Serviço inoperante',
            description: 'Não foi possivel conectar ao servidor',
          })
        }
      })

    return response
  } catch (error) {
    console.error(error)
  }
}

export const useActivedUser = () => {
  const { addToast } = useToast()

  return useMutation({
    mutationFn: (payloadEntry: IActivedUsers) =>
      activedUsers(payloadEntry, addToast),
  })
}
