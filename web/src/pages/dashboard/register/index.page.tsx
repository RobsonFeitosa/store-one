import DashboardLayout from '@/components/components/Layout/Dashboard'
import MainLayout from '@/components/components/Layout/Main'
import { BsPersonBoundingBox } from 'react-icons/bs'
import { FiMail, FiLock, FiCamera, FiUser } from 'react-icons/fi'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button, Heading, TextInput } from '@lemonade-technologies-hub-ui/react'
import { Col, Container, Row } from 'react-bootstrap'
import { AvatarInput, Form, RegisterContainer, RegisterContent } from './styles'
import { useForm } from 'react-hook-form'
import { useAuth } from '@/hooks/providers/auth'
import { ChangeEvent, useEffect } from 'react'
import { useUpdateRegister } from './useUpdateRegister'
import { useUpdateAvatar } from './useUpdateAvatar'
import Image from 'next/image'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'

const registerForm = z
  .object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
    old_password: z.string(),
    password_confirmation: z.string(),
  })
  .superRefine(({ password_confirmation, password }, ctx) => {
    if (password_confirmation !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'As senhas não correspondem',
      })
    }
  })

export type RegisterFormData = z.infer<typeof registerForm>

export default function Register() {
  const { user, updateUser } = useAuth()
  const { mutateAsync: mutateUpdateRegisterAsync } = useUpdateRegister()
  const { data: updateData, mutateAsync: mutateUpdateAvatarAsync } =
    useUpdateAvatar()

  const {
    handleSubmit,
    setValue,
    register,
    formState: { isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerForm),
  })

  useEffect(() => {
    user && setValue('name', user.name)
    user && setValue('email', user.email ?? '')
  }, [user, setValue])

  async function handleRegister(data: RegisterFormData) {
    await mutateUpdateRegisterAsync(data)
  }

  function handleAvatarChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const data = new FormData()

      data.append('avatar', e.target.files[0])
      mutateUpdateAvatarAsync(data)
    }
  }

  useEffect(() => {
    if (updateData) {
      const { settings, ...usersRest } = updateData.data
      const { id, ...restSettings } = updateData.data.settings
      console.info({ settings, id })
      updateUser({
        ...usersRest,
        ...restSettings,
      })
    }
  }, [updateData, updateUser])

  return (
    <div>
      <MainLayout>
        <Container>
          <DashboardLayout>
            <RegisterContainer>
              <Row>
                <Col xs lg="12">
                  <Heading as="h3">Meu cadastro</Heading>
                </Col>
              </Row>
              <RegisterContent>
                <Row>
                  <Col xs="12" sm="8" md="8" lg="8">
                    <Form as="form" onSubmit={handleSubmit(handleRegister)}>
                      <TextInput
                        startIcon={FiUser}
                        placeholder="Nome"
                        {...register('name')}
                      />
                      <TextInput
                        startIcon={FiMail}
                        placeholder="E-mail"
                        {...register('email')}
                      />
                      <TextInput
                        startIcon={FiLock}
                        type="password"
                        placeholder="Senha atual"
                        {...register('old_password')}
                      />
                      <TextInput
                        startIcon={FiLock}
                        type="password"
                        placeholder="Nova senha"
                        {...register('password')}
                      />
                      <TextInput
                        startIcon={FiLock}
                        type="password"
                        placeholder="Confirmar senha"
                        {...register('password_confirmation')}
                      />

                      <Button size="lg" type="submit" disabled={isSubmitting}>
                        Salvar mudanças
                      </Button>
                    </Form>
                  </Col>
                  <Col xs="12" sm="4" md="4" lg="4">
                    <AvatarInput>
                      {user?.settings.avatar_url ? (
                        <Image
                          src={user.settings.avatar_url}
                          height={100}
                          width={100}
                          alt=""
                        />
                      ) : (
                        <BsPersonBoundingBox />
                      )}

                      <label>
                        <FiCamera />

                        <input
                          type="file"
                          name="filename"
                          id="avatar"
                          onChange={handleAvatarChange}
                        />
                      </label>
                    </AvatarInput>
                  </Col>
                </Row>
              </RegisterContent>
            </RegisterContainer>
          </DashboardLayout>
        </Container>
      </MainLayout>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { '@StoreOne:user': userOnCookies } = parseCookies({ req })

  const user = userOnCookies ? JSON.parse(userOnCookies) : null

  return {
    props: {
      user,
    },
  }
}
