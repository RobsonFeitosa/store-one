import { URLs, urlBuilder } from '@/utils/urlBuilder'
import { useMutation } from '@tanstack/react-query'
import { api } from '@/utils/handleClient'
import { ToastMessage, useToast } from '@/hooks/providers/toast'

interface SendEmailProfessionalProps {
  email: string
  addToast: (message: Omit<ToastMessage, 'id'>) => void
}

const sendEmailProfessional = async ({
  email,
  addToast,
}: SendEmailProfessionalProps) => {
  try {
    const response = await api.post(
      urlBuilder({
        address: [URLs.PROFESSIONALS, URLs.PROFESSIONALS_SEND_INVITE].join(''),
      }),
      { email },
    )

    if (response.status === 200) {
      addToast({
        type: 'info',
        title: 'E-mail enviado',
        description: 'E-mail disparado para caixa de entrada do professional',
      })
    }

    return response
  } catch (error) {
    console.error(error)
  }
}

export const useSendEmailProfessional = () => {
  const { addToast } = useToast()
  return useMutation({
    mutationFn: (email: string) => sendEmailProfessional({ email, addToast }),
  })
}

