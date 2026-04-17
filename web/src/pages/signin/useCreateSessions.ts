import { useAuth, IUser } from '@/hooks/providers/auth'
import { ToastMessage, useToast } from '@/hooks/providers/toast'
import { api } from '@/utils/handleClient'
import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useMutation } from '@tanstack/react-query'
import { NextRouter, useRouter } from 'next/router'

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

interface ICreateSessions {
  email: string
  password: string
}

type SignIn = {
  token: string
  user: IUser
}

function redirectRouterSession(level: number, router: NextRouter) {
  router.push('/')
}

const createSessions = async (
  payload: ICreateSessions,
  addToast: (message: Omit<ToastMessage, 'id'>) => void,
  signIn: (data: SignIn) => void,
  router: NextRouter,
  isRedirect: boolean | undefined,
) => {
  try {
    const response = await api
      .post(
        urlBuilder({
          address: URLs.SESSIONS,
        }),
        payload,
      )
      .then((response) => {
        if (response?.status === 200) {
          if (response.data.token === 'inactive-user--resend-mail') {
            addToast({
              type: 'info',
              title: 'Usuário inativo',
              description: 'Confira sua caixa de e-mail para ativar sua conta.',
            })

            return
          }

          addToast({
            type: 'success',
            title: 'Usuário autenticado',
            description:
              'Usuário logado com sucesso, aguarde e será redirecionado para a calculadora.',
          })

          const { token, user } = response.data

          signIn({
            user,
            token,
          })

          isRedirect && redirectRouterSession(user.level, router)
        }

        return response.data
      })
      .catch((err) => {
        console.error(err)

        if (err?.response.status === 401) {
          addToast({
            type: 'error',
            title: 'Usuário não autenticado',
            description: 'Combinação incorreta de e-mail/senha.',
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

export const useCreateSessions = (isRedirect?: boolean) => {
  const { addToast } = useToast()
  const { signIn } = useAuth()
  const router = useRouter()

  return useMutation({
    mutationFn: (payloadEntry: ICreateSessions) =>
      createSessions(payloadEntry, addToast, signIn, router, isRedirect),
  })
}
