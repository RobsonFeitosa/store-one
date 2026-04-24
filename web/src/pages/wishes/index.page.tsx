import MainLayout from '@/components/components/Layout/Main'
import { Heading, Text } from '@lemonade-technologies-hub-ui/react'
import { Col, Container, Row } from 'react-bootstrap'
import { useAuth } from '@/hooks/providers/auth'
import { useGetAllProducts } from '@/hooks/useGetAllProducts'
import { useWishes } from '@/hooks/providers/wishes'
import ProductBox from '@/components/ProductBox'

import {
  WishHeader,
  WisheWrapper,
  WishesContainer,
  WishesContent,
} from './style'

export default function Wishes() {
  const { user } = useAuth()
  const { wishes: wishesIds } = useWishes()
  
  const { data: productsData } = useGetAllProducts({
    options: {
      limit: 9999,
      page: 1,
    },
    productIds: JSON.stringify(wishesIds)
  }, 'wishes-page', !!user && wishesIds.length > 0)

  const wishes = productsData?.[0] || []

  return (
    <MainLayout>
      <WishesContainer>
        <Container>
          <Row>
            <Col>
              <WishHeader>
                <Heading as="h3">Lista de desejos</Heading>
              </WishHeader>
            </Col>
          </Row>
          <WishesContent>
            <Row>
              {wishes.length > 0 ? (
                wishes.map((product) => (
                  <Col xs="12" sm="12" md="6" lg="3" key={product.id}>
                    <WisheWrapper>
                      <ProductBox product={product} mode="grid" />
                    </WisheWrapper>
                  </Col>
                ))
              ) : (
                <div>
                  <Text>Nenhum item foi adicionado</Text>
                </div>
              )}
            </Row>
          </WishesContent>
        </Container>
      </WishesContainer>
    </MainLayout>
  )
}
