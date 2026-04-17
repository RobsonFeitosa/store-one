import { api } from '@/utils/handleClient'
import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useMutation } from '@tanstack/react-query'
import { ToastMessage, useToast } from '@/hooks/providers/toast'
import { useAuth } from '@/hooks/providers/auth'
import { IUpdateRegister } from '@/pages/dtos/user.dto'

interface UpdateRegisterProps {
  payload: IUpdateRegister
  userId: string
  addToast: (message: Omit<ToastMessage, 'id'>) => void
}

const updateRegister = async ({
  payload,
  userId,
  addToast,
}: UpdateRegisterProps) => {
  try {
    const response = await api.put(
      urlBuilder({
        address: [URLs.USERS, userId].join('/'),
      }),
      payload,
    )

    if (response.status === 200) {
      addToast({
        type: 'success',
        title: 'Usuário atualizado',
        description: 'Seu registroi foi atualizado com sucesso',
      })
    } else {
      addToast({
        type: 'error',
        title: 'Usuário não atualizado',
        description:
          'Não foi possivel atualizar seu registro de usuário, por favor tente mais tarde!',
      })
    }

    return response
  } catch (error) {
    console.error(error)
  }
}

export const useUpdateRegister = () => {
  const { user } = useAuth()
  const { addToast } = useToast()

  return useMutation({
    mutationFn: (payload: IUpdateRegister) =>
      updateRegister({ payload, addToast, userId: user.id }),
  })
}
