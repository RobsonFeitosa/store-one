import { ToastMessage, useToast } from '@/hooks/providers/toast'
import { api } from '@/utils/handleClient'
import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useMutation } from '@tanstack/react-query'

interface ICreateUsers {
  name: string
  email: string
  password: string
}

const createUsers = async (
  payload: ICreateUsers,
  addToast: (message: Omit<ToastMessage, 'id'>) => void,
) => {
  try {
    const response = await api
      .post(
        urlBuilder({
          address: URLs.USERS,
        }),
        payload,
      )
      .then((response) => {
        if (response?.status === 200) {
          addToast({
            type: 'success',
            title: 'Usuário cadastrado',
            description: 'Seu usuário foi cadastrodo.',
          })

          setTimeout(() => {
            addToast({
              type: 'info',
              title: 'Verifique seu e-mail',
              description:
                'Seu usuário foi cadastrodo, mas é necessário ativa-lo.',
            })
          }, 400)
        }

        return response.data
      })
      .catch((err) => {
        if (err?.response.status === 400) {
          addToast({
            type: 'error',
            title: 'Usuário já existe',
            description:
              'Não foi possivel criar a conta de usuário, tente outro e-mail!',
          })
        }
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

export const useCreateUser = () => {
  const { addToast } = useToast()

  return useMutation({
    mutationFn: (payloadEntry: ICreateUsers) =>
      createUsers(payloadEntry, addToast),
  })
}
