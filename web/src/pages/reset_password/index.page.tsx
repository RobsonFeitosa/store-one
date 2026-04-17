import { FiLock } from 'react-icons/fi'
import {
  Button,
  Heading,
  Text,
  TextInput,
} from '@lemonade-technologies-hub-ui/react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import MainLayout from '@/components/components/Layout/Main'
import { Form, ResetPasswordContainer } from './styles'
import { Col, Container, Row } from 'react-bootstrap'
import { useCreateResetPassword } from './useCreateResetPassword'

export const resetFormSchema = z
  .object({
    password: z.string(),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'As senhas não coincidem',
    path: ['password_confirmation'],
  })

export type ResetFormInput = z.infer<typeof resetFormSchema>

export default function ResetPassword() {
  const router = useRouter()
  const { mutateAsync: mutateResetPasswordAsync } = useCreateResetPassword()

  const { token } = router.query

  const {
    handleSubmit,
    register,
    formState: {
      isSubmitting,
      errors: { password_confirmation },
    },
  } = useForm<ResetFormInput>({
    resolver: zodResolver(resetFormSchema),
  })

  async function handleRegister(data: ResetFormInput) {
    await mutateResetPasswordAsync({ ...data, token: String(token) })
  }

  return (
    <MainLayout>
      <Container>
        <Row>
          <Col xs lg="12">
            <ResetPasswordContainer>
              <Form as="form" onSubmit={handleSubmit(handleRegister)}>
                <Heading as="h4">Resetar senha</Heading>
                <Text>Insira seu email para recuperar suas senha!</Text>

                <TextInput
                  startIcon={FiLock}
                  type="password"
                  placeholder="Nova senha"
                  {...register('password')}
                />

                <TextInput
                  startIcon={FiLock}
                  type="password"
                  placeholder="Confirmação da senha"
                  error={password_confirmation?.message}
                  {...register('password_confirmation')}
                />

                <Button type="submit" disabled={isSubmitting}>
                  Alterar senha
                </Button>
              </Form>
            </ResetPasswordContainer>
          </Col>
        </Row>
      </Container>
    </MainLayout>
  )
}
