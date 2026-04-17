import { ToastMessage, useToast } from '@/hooks/providers/toast'
import { api } from '@/utils/handleClient'
import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useMutation } from '@tanstack/react-query'

const activedUsers = async (
  email: string,
  addToast: (message: Omit<ToastMessage, 'id'>) => void,
) => {
  try {
    const response = await api
      .post(
        urlBuilder({
          address: URLs.USERS_FORGOT_PASSWORD,
        }),
        { email },
      )
      .then((response) => {
        if (response?.status === 204) {
          addToast({
            type: 'success',
            title: 'E-mail enviado',
            description: 'Confira sua caixa de entrada para continuar.',
          })
        }

        return response.data
      })
      .catch((err) => {
        if (err?.response.status === 400) {
          addToast({
            type: 'info',
            title: 'Usuário não encontrado',
            description:
              'Não existe uma conta que corresponde a esse e-mail inserido.',
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

export const useSendEmailForgot = () => {
  const { addToast } = useToast()

  return useMutation({
    mutationFn: (email: string) => activedUsers(email, addToast),
  })
}
