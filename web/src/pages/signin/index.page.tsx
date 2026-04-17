import Link from 'next/link'
import MainLayout from '@/components/components/Layout/Main'
import {
  Button,
  Dialog,
  DialogRoot,
  Heading,
  TextInput,
} from '@lemonade-technologies-hub-ui/react'
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'
import { Container as Grid, Col, Row } from 'react-bootstrap'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { SignInFormInput, signInFormSchema } from './AccessAccountModal'
import Or from '@/components/Or'
import { useCreateSessions } from './useCreateSessions'

import ForgotRequest from './ForgotRequest'
import { useEffect, useState } from 'react'
import { GoogleLogin } from '@react-oauth/google'
import {
  IGoogleCredentials,
  useCreateGoogleSessions,
} from './useCreateGoogleSessions'

import {
  BtnSendForgot,
  Form,
  SignInContainer,
  SignInContent,
  Wrapper,
} from './styles'
import { useRouter } from 'next/router'

const isRedirect = true

export default function SignIn() {
  const { mutateAsync } = useCreateSessions(isRedirect)
  const { isSuccess, mutateAsync: mutateGoogleSessionAsync } =
    useCreateGoogleSessions()

  const [openForgotSend, setOpenForgotSend] = useState(false)

  const {
    handleSubmit,
    register,
    formState: {
      errors: { email, password },
    },
  } = useForm<SignInFormInput>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: 'jonh@email.com',
      password: '123123',
    },
  })

  async function handleRegister(data: SignInFormInput) {
    await mutateAsync(data)
  }

  async function handleLoginGoogle(response: IGoogleCredentials) {
    const { credential, clientId } = response

    await mutateGoogleSessionAsync({ clientId, credential })
  }

  const router = useRouter()

  useEffect(() => {
    if (isSuccess) {
      router.push('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess])

  return (
    <>
      <DialogRoot open={openForgotSend}>
        <Dialog offClosed title="Esqueci minha senha">
          <ForgotRequest onClose={() => setOpenForgotSend(false)} />
        </Dialog>
      </DialogRoot>

      <MainLayout>
        <Grid>
          <SignInContainer>
            <Row>
              <Col xs="12" sm="12" lg="5">
                <SignInContent>
                  <Form as="form" onSubmit={handleSubmit(handleRegister)}>
                    <Heading as="h1">Faça seu login</Heading>

                    <TextInput
                      startIcon={FiMail}
                      type="email"
                      placeholder="E-mail"
                      error={email?.message}
                      {...register('email')}
                    />

                    <TextInput
                      startIcon={FiLock}
                      type="password"
                      error={password?.message}
                      placeholder="Senha"
                      {...register('password')}
                    />

                    <Wrapper>
                      <Button type="submit">Entrar</Button>

                      <BtnSendForgot
                        type="button"
                        onClick={() => setOpenForgotSend(true)}
                      >
                        Esqueci minha senha
                      </BtnSendForgot>
                    </Wrapper>
                  </Form>

                  <hr />

                  <Link href="/signup">
                    <FiLogIn />
                    Criar conta
                  </Link>
                </SignInContent>
              </Col>
              <Col xs="12" sm="12" lg="2">
                <SignInContent>
                  <Or />
                </SignInContent>
              </Col>
              <Col xs="12" sm="12" lg="3">
                <SignInContent>
                  <GoogleLogin onSuccess={handleLoginGoogle} />
                </SignInContent>
              </Col>
            </Row>
          </SignInContainer>
        </Grid>
      </MainLayout>
    </>
  )
}
