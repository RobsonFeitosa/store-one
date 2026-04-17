import { FiMail } from 'react-icons/fi'
import { Button, Text, TextInput } from '@lemonade-technologies-hub-ui/react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { ForgotContainer, Form } from './styles'
import { useForm } from 'react-hook-form'
import { useSendEmailForgot } from './useSendEmailForgot'
import { useEffect } from 'react'
import { DialogCloseCustom } from '@/components/DialogCloseCustom'

export const forgotFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Este campo deve ser preenchido' })
    .email('Este não é um e-mail válido'),
})

export type ForgotFormInput = z.infer<typeof forgotFormSchema>

interface ForgotRequestProps {
  onClose: () => void
}

export default function ForgotRequest({ onClose }: ForgotRequestProps) {
  const { data: sendEmailData, mutateAsync: mutateSendEmailForgotAsync } =
    useSendEmailForgot()

  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm<ForgotFormInput>({
    resolver: zodResolver(forgotFormSchema),
  })

  async function handleRegister(data: ForgotFormInput) {
    await mutateSendEmailForgotAsync(data.email)
  }

  useEffect(() => {
    if (sendEmailData !== undefined) onClose()
  }, [sendEmailData, onClose])

  return (
    <ForgotContainer>
      <DialogCloseCustom onClose={onClose} />

      <Form as="form" onSubmit={handleSubmit(handleRegister)}>
        <Text>Insira seu email para recuperar suas senha!</Text>

        <TextInput
          startIcon={FiMail}
          type="email"
          placeholder="E-mail"
          {...register('email')}
        />

        <Button type="submit" disabled={isSubmitting}>
          Enviar
        </Button>
      </Form>
    </ForgotContainer>
  )
}
