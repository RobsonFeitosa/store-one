import { Col, Container, Row } from 'react-bootstrap'
import {
  BoxWrapper,
  Descriptions,
  EmphasisSessionContainer,
  ImagaWrapper,
  Loading,
} from './styles'
import { Text } from '@lemonade-technologies-hub-ui/react'
import { useGetProductEmphasis } from '@/hooks/useGetProductEmphasis'
import { useEffect } from 'react'
import ProductEmphasis from './ProductEmphasis'
import { IProductDTO } from '@/pages/dtos/product.dto'
import Mackbook from '@/assets/mackbook.png'
import Phones from '@/assets/phones.png'
import Skeleton from 'react-loading-skeleton'
import Image from 'next/image'

export default function EmphasisSession() {
  const {
    isLoading,
    data: productEmphasis,
    refetch: getProductEmphasis,
  } = useGetProductEmphasis()

  useEffect(() => {
    getProductEmphasis()
  }, [getProductEmphasis])

  const product = productEmphasis ?? ({} as IProductDTO)

  return (
    <EmphasisSessionContainer>
      <Container>
        <Row>
          <Col md={12} lg={8}>
            {isLoading ? (
              <Loading>
                <div>
                  <Skeleton count={1} height={495} borderRadius={8} />
                </div>
              </Loading>
            ) : (
              <ProductEmphasis product={product} />
            )}
          </Col>
          <Col md={12} lg={3}>
            <BoxWrapper>
              <Descriptions>
                <Text as="span">Ganhe 20% de desconto</Text>
                <Text as="strong">Novo Mac 8pro.</Text>
              </Descriptions>

              <ImagaWrapper>
                <Image src={Mackbook} width={218} height={138} alt="" />
              </ImagaWrapper>
            </BoxWrapper>
            <BoxWrapper>
              <Descriptions>
                <Text as="span">Novo Surface, Compre agora!</Text>
                <Text as="strong">Microsoft Studio</Text>
              </Descriptions>

              <ImagaWrapper>
                <Image src={Phones} width={269} height={158} alt="" />
              </ImagaWrapper>
            </BoxWrapper>
          </Col>
        </Row>
      </Container>
    </EmphasisSessionContainer>
  )
}
