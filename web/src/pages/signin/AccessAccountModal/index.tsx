import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { TextInput } from '@lemonade-technologies-hub-ui/react'
import { useCreateSessions } from '../useCreateSessions'
import Link from 'next/link'
import { DialogCloseCustom } from '@/components/DialogCloseCustom'
import Or from '@/components/Or'
import {
  IGoogleCredentials,
  useCreateGoogleSessions,
} from '../useCreateGoogleSessions'
import { GoogleLogin } from '@react-oauth/google'

import {
  AccessAccountModalContainer,
  BtnSendForgot,
  ButtonForm,
  Form,
  LinkWrapper,
  SessionGoogle,
} from './style'
import { useEffect } from 'react'

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
  const { isSuccess, mutateAsync } = useCreateSessions()
  const { isSuccess: isSuccessGoogle, mutateAsync: mutateGoogleSessionAsync } =
    useCreateGoogleSessions()

  const { handleSubmit, register } = useForm<SignInFormInput>({
    resolver: zodResolver(signInFormSchema),
  })

  async function onSubmit(data: SignInFormInput) {
    await mutateAsync(data)
  }

  async function handleLoginGoogle(response: IGoogleCredentials) {
    const { credential, clientId } = response

    await mutateGoogleSessionAsync({ clientId, credential })
  }

  useEffect(() => {
    if (isSuccessGoogle || isSuccess) {
      onClose()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
