import { ToastMessage, useToast } from '@/hooks/providers/toast'
import { api } from '@/utils/handleClient'
import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useMutation } from '@tanstack/react-query'
import { NextRouter, useRouter } from 'next/router'

interface Payload {
  password: string
  password_confirmation: string
  token: string
}

interface ResetPasswordProps {
  payload: Payload
  addToast: (message: Omit<ToastMessage, 'id'>) => void
  router: NextRouter
}

const resetPassword = async ({
  payload,
  addToast,
  router,
}: ResetPasswordProps) => {
  const { password, password_confirmation, token } = payload

  try {
    const response = await api
      .post(
        urlBuilder({
          address: URLs.USERS_PASSWORD_RESET,
        }),
        { password, password_confirmation, token },
      )
      .then((response) => {
        if (response?.status === 204) {
          addToast({
            type: 'success',
            title: 'Senha atualizada',
            description: 'Sua senha foi atualizada com sucesso.',
          })

          setTimeout(() => {
            router.push('/signin')
          }, 1200)
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

export const useCreateResetPassword = () => {
  const { addToast } = useToast()
  const router = useRouter()

  return useMutation({
    mutationFn: (payload: Payload) =>
      resetPassword({ payload, addToast, router }),
  })
}
