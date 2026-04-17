import { ReactNode } from 'react'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Container, Row } from 'react-bootstrap'
import { Text } from '@lemonade-technologies-hub-ui/react'
import Skeleton from 'react-loading-skeleton'

import {
  BodyContent,
  Breadcrumb,
  BreadcrumbHeading,
  BreadcrumbText,
  HeaderContent,
  HeaderContentWrapper,
  Loading,
} from './styles'

interface MainProps {
  children: ReactNode
  title?: string
  isLoading?: boolean
  onHeader?: boolean
}

export default function MainLayout({
  children,
  onHeader = false,
  title,
  isLoading,
}: MainProps) {
  return (
    <>
      <Header />
      {onHeader && (
        <HeaderContent>
          <Container>
            <Row>
              <HeaderContentWrapper>
                {isLoading ? (
                  <Loading>
                    <div>
                      <Skeleton
                        count={1}
                        width={150}
                        height={40}
                        borderRadius={4}
                      />
                      <Skeleton
                        count={1}
                        width={150}
                        height={40}
                        borderRadius={4}
                      />
                    </div>
                  </Loading>
                ) : (
                  <>
                    <div>
                      <BreadcrumbHeading>
                        <Text>{title}</Text>
                      </BreadcrumbHeading>
                    </div>

                    <Breadcrumb>
                      <li>
                        <Text>Home</Text>
                      </li>
                      <Text>/</Text>
                      <li>
                        <BreadcrumbText>{title}</BreadcrumbText>
                      </li>
                    </Breadcrumb>
                  </>
                )}
              </HeaderContentWrapper>
            </Row>
          </Container>
        </HeaderContent>
      )}
      <BodyContent>{children}</BodyContent>
      <Footer /> <div id="footer" />
    </>
  )
}
