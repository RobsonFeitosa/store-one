import MainLayout from '@/components/components/Layout/Main'
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi'
import { Container as Grid, Col, Row } from 'react-bootstrap'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { useCreateUser } from './useCreateUser'
import {
  Button,
  Checkbox,
  Heading,
  Text,
  TextInput,
} from '@lemonade-technologies-hub-ui/react'
import Or from '@/components/Or'
import Link from 'next/link'
import { useEffect } from 'react'
import { useToast } from '@/hooks/providers/toast'
import { useRouter } from 'next/router'

import { Form, LabelCheckbox, SignUpContent, SignupContainer } from './styles'
import { GoogleLogin } from '@react-oauth/google'
import {
  IGoogleCredentials,
  useCreateGoogleSessions,
} from '../signin/useCreateGoogleSessions'

export const signUpFormSchema = z.object({
  name: z.string().min(1),
  email: z
    .string()
    .min(1, { message: 'Este campo deve ser preenchido' })
    .email('Este não é um e-mail válido'),
  password: z.string(),
  terms: z.boolean(),
})

export type SignUpFormInput = z.infer<typeof signUpFormSchema>

export default function Signup() {
  const { push } = useRouter()
  const { addToast } = useToast()

  const { mutateAsync: mutateCreateUserAsync } = useCreateUser()
  const { mutateAsync: mutateGoogleSessionAsync } = useCreateGoogleSessions()

  const {
    handleSubmit,
    register,
    control,
    formState: {
      errors: { terms, name, email, password },
      isSubmitting,
    },
  } = useForm<SignUpFormInput>({
    resolver: zodResolver(signUpFormSchema),
  })

  async function handleRegister(data: SignUpFormInput) {
    const { terms: _, ...payload } = data

    try {
      await mutateCreateUserAsync(payload)
      push('/signin')
    } catch { }
  }

  useEffect(() => {
    if (terms) {
      addToast({
        type: 'info',
        title: 'Termos e condições',
        description: 'É necessário aceitar os termos para criar a conta',
      })
    }
  }, [terms, addToast])

  async function handleLoginGoogle(response: IGoogleCredentials) {
    const { credential, clientId } = response

    await mutateGoogleSessionAsync({ clientId, credential })
  }

  return (
    <MainLayout>
      <Grid>
        <SignupContainer>
          <Row>
            <Col xs="12" sm="12" lg="5">
              <SignUpContent>
                <Form
                  as="form"
                  onSubmit={handleSubmit(handleRegister)}
                  autoComplete="off"
                >
                  <Heading as="h1">Faça seu cadastro</Heading>

                  <TextInput
                    startIcon={FiUser}
                    placeholder="Nome"
                    error={name?.message}
                    {...register('name')}
                  />

                  <TextInput
                    startIcon={FiMail}
                    type="email"
                    autoComplete="off"
                    error={email?.message}
                    placeholder="E-mail"
                    {...register('email')}
                  />

                  <TextInput
                    startIcon={FiLock}
                    type="password"
                    placeholder="Senha"
                    error={password?.message}
                    autoComplete="new-password"
                    {...register('password')}
                  />

                  <LabelCheckbox>
                    <Controller
                      control={control}
                      name={`terms`}
                      render={({ field: { onChange, ref } }) => {
                        return (
                          <Checkbox
                            id="terms"
                            onCheckedChange={(checked) => {
                              onChange(checked)
                            }}
                            ref={ref}
                          />
                        )
                      }}
                    />

                    <Text as="span" size="xs">
                      Eu concordo com alosix.com
                    </Text>
                    <Link href="https://www.alosix.com/policy">
                      Termos de Uso e Condições
                    </Link>
                  </LabelCheckbox>

                  <Button type="submit" disabled={isSubmitting}>
                    Cadastrar
                  </Button>
                </Form>
                <Link href="/signin">
                  <FiArrowLeft />
                  Voltar para login
                </Link>
              </SignUpContent>
            </Col>
            <Col xs="12" sm="12" lg="2">
              <SignUpContent>
                <Or />
              </SignUpContent>
            </Col>
            <Col xs="12" sm="12" lg="3">
              <SignUpContent>
                <GoogleLogin onSuccess={handleLoginGoogle} />
              </SignUpContent>
            </Col>
          </Row>
        </SignupContainer>
      </Grid>
    </MainLayout>
  )
}
