import MainLayout from '@/components/components/Layout/Main'
import { Heading, Text } from '@lemonade-technologies-hub-ui/react'
import { Col, Container, Row } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { useWishes } from '@/hooks/providers/wishes'
import { useGetAllProducts } from '@/hooks/useGetAllProducts'
import { IProductDTO } from '../dtos/product.dto'
import ProductBox from '@/components/ProductBox'

import {
  WishHeader,
  WisheWrapper,
  WishesContainer,
  WishesContent,
} from './style'

export default function Wishes() {
  const { wishes: wishesHook } = useWishes()
  const [wishes, setWishes] = useState<IProductDTO[]>()

  const { data: productsData, refetch: getAllProducts } = useGetAllProducts(
    {
      options: {
        limit: 9999,
        page: 1,
      },
      productIds: JSON.stringify(wishesHook),
    },
    'wishes',
  )

  useEffect(() => {
    getAllProducts()
  }, [wishesHook, getAllProducts])

  const [products] = productsData ?? []

  useEffect(() => {
    if (products && products.length > 0) {
      setWishes(products)
    }
  }, [products, setWishes])

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
              {wishes && wishes?.length > 0 ? (
                wishes?.map((wish) => (
                  <Col xs="12" sm="12" md="6" lg="3" key={wish.id}>
                    <WisheWrapper>
                      <ProductBox product={wish} mode="grid" />
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
