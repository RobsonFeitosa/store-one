import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { DialogCloseCustom } from '@/components/DialogCloseCustom'
import Or from '@/components/Or'
import { GoogleLogin } from '@react-oauth/google'

import {
  AccessAccountModalContainer,
  BtnSendForgot,
  ButtonForm,
  Form,
  LinkWrapper,
  SessionGoogle,
} from './style'
import { TextInput } from '@lemonade-technologies-hub-ui/react'
import {
  IGoogleCredentials,
  useCreateGoogleSessions,
} from '@/pages/signin/useCreateGoogleSessions'
import { useCreateSessions } from '@/pages/signin/useCreateSessions'

export const signInFormSchema = z.object({
  email: z.string(),
  password: z.string(),
})

export type SignInFormInput = z.infer<typeof signInFormSchema>

interface AccessAccountModalProps {
  onClose: () => void
  onOpenForgotModal: () => void
}

export function AccessAccountModal({
  onClose,
  onOpenForgotModal,
}: AccessAccountModalProps) {
  const { mutateAsync } = useCreateSessions()
  const { mutateAsync: mutateGoogleSessionAsync } = useCreateGoogleSessions()

  const { handleSubmit, register } = useForm<SignInFormInput>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: 'jonh@email.com',
      password: '123123',
    },
  })

  async function onSubmit(data: SignInFormInput) {
    await mutateAsync(data)

    onClose()
  }

  async function handleLoginGoogle(response: IGoogleCredentials) {
    const { credential, clientId } = response

    await mutateGoogleSessionAsync({ clientId, credential })

    onClose()
  }

  return (
    <AccessAccountModalContainer>
      <DialogCloseCustom onClose={onClose} />
      <Form as="form" onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          startIcon={FiMail}
          placeholder="E-mail"
          {...register('email')}
        />

        <TextInput
          startIcon={FiLock}
          type="password"
          placeholder="Senha"
          {...register('password')}
        />

        <ButtonForm type="submit">Entrar</ButtonForm>
      </Form>

      <LinkWrapper>
        <BtnSendForgot
          type="button"
          onClick={() => {
            onClose()
            onOpenForgotModal()
          }}
        >
          Esqueci minha senha
        </BtnSendForgot>

        <Link href="/signup">
          <FiLogIn />
          Criar conta
        </Link>
      </LinkWrapper>

      <Or />

      <SessionGoogle>
        <GoogleLogin onSuccess={handleLoginGoogle} />
      </SessionGoogle>
    </AccessAccountModalContainer>
  )
}
