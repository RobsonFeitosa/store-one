import { api } from '@/utils/handleClient'
import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useMutation } from '@tanstack/react-query'
import { ToastMessage, useToast } from '@/hooks/providers/toast'
import { useAuth } from '@/hooks/providers/auth'

interface UpdateAvatarProps {
  avatar: FormData
  userId: string
  addToast: (message: Omit<ToastMessage, 'id'>) => void
}

const updateAvatar = async ({
  avatar,
  userId,
  addToast,
}: UpdateAvatarProps) => {
  try {
    const response = await api.patch(
      urlBuilder({
        address: [URLs.USERS, URLs.USERS_AVATAR, userId].join('/'),
      }),
      avatar,
    )

    if (response.status === 200) {
      addToast({
        type: 'success',
        title: 'Avatar atualizado',
        description: 'Seu avatar foi atualizado com sucesso',
      })
    } else {
      addToast({
        type: 'error',
        title: 'Avatar não atualizado',
        description:
          'Não foi possivel atualizar seu avatar, por favor tente mais tarde!',
      })
    }

    return response
  } catch (error) {
    console.error(error)
  }
}

export const useUpdateAvatar = () => {
  const { user } = useAuth()
  const { addToast } = useToast()

  return useMutation({
    mutationFn: (avatar: FormData) =>
      updateAvatar({ avatar, addToast, userId: user.id }),
  })
}
