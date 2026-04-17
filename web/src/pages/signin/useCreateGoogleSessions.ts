import { useAuth, IUser } from '@/hooks/providers/auth'
import { ToastMessage, useToast } from '@/hooks/providers/toast'
import { api } from '@/utils/handleClient'
import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useMutation } from '@tanstack/react-query'

export interface ISessionUser {
  user: {
    id: string
    avatar: string | null
    level: number
    cpf?: string | null
    actived: boolean
    phone_number?: string | null
    is_first_calculation: boolean
    created_at: Date
    updated_at: Date
    settings_id: string
    name: string
    email?: string
  }
  token: string
}

export interface IGoogleCredentials {
  credential?: string
  clientId?: string
}

type SignIn = {
  token: string
  user: IUser
}

const createSessions = async (
  payload: IGoogleCredentials,
  addToast: (message: Omit<ToastMessage, 'id'>) => void,
  signIn: (data: SignIn) => void,
) => {
  try {
    const response = await api
      .post(
        urlBuilder({
          address: [URLs.SESSIONS, URLs.SESSIONS_GOOGLE].join(''),
        }),
        payload,
      )
      .then((response) => {
        const { token, user } = response.data

        if (token === 'inactive-user--resend-mail') {
          addToast({
            type: 'info',
            title: 'Usuário inativo',
            description: 'Esse usuário esta com sua conta desativada.',
          })
          return null
        }

        if (response?.status === 200) {
          addToast({
            type: 'success',
            title: 'Usuário autenticado',
            description:
              'Usuário logado com sucesso, aguarde e será redirecionado para a calculadora.',
          })

          signIn({
            user,
            token,
          })
        } else {
          addToast({
            type: 'error',
            title: 'Usuário não autenticado',
            description: 'Não foi possivel identificar o usuário.',
          })
        }

        return response.data
      })
      .catch((err) => {
        console.error(err)

        // addToast({
        //   type: 'error',
        //   title: 'Serviço inoperante',
        //   description: 'Não foi possivel conectar ao servidor',
        // })
      })

    return response
  } catch (error) {
    console.error(error)
  }
}

export const useCreateGoogleSessions = () => {
  const { addToast } = useToast()
  const { signIn } = useAuth()

  return useMutation({
    mutationFn: (payload: IGoogleCredentials) =>
      createSessions(payload, addToast, signIn),
  })
}
