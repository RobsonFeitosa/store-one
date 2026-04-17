import { useEffect } from 'react'
import { Container as Grid, Row, Col } from 'react-bootstrap'
import { FaUser } from 'react-icons/fa'
import Link from 'next/link'
import { Text } from '@lemonade-technologies-hub-ui/react'
import MainLayout from '@/components/components/Layout/Main'
import { useRouter } from 'next/router'

import { ActivedContainer, ActivedContent } from './styles'
import { useActivedUser } from '../signup/useActivedUser'

export default function Actived() {
  const router = useRouter()

  const { mutateAsync: mutateActivedUserAsync } = useActivedUser()
  const { token } = router.query

  useEffect(() => {
    token && mutateActivedUserAsync({ token: String(token) })
  }, [token, mutateActivedUserAsync])

  return (
    <MainLayout>
      <Grid>
        <Row>
          <Col xs lg="12">
            <ActivedContainer>
              <ActivedContent>
                <div>
                  <Text>Sua conta foi ativada com sucesso!</Text>

                  <Link href="/signin">
                    <FaUser />
                    Fazer login
                  </Link>
                </div>
              </ActivedContent>
            </ActivedContainer>
          </Col>
        </Row>
      </Grid>
    </MainLayout>
  )
}
