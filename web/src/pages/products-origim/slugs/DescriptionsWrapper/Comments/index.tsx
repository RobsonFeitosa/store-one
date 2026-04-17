import {
  Dialog,
  DialogRoot,
  Heading,
  Text,
} from '@lemonade-technologies-hub-ui/react'
import {
  BtnMore,
  BtnUtil,
  CommentsBox,
  CommentsContainer,
  CommentsHeader,
  CommentsWrappers,
  CropText,
  ShowMore,
  StarsWrapper,
  Util,
} from './styles'
import { Col, Row } from 'react-bootstrap'
import { FaStar, FaStarHalfAlt } from 'react-icons/fa'
import { ThumbsUp } from 'phosphor-react'
import { useState } from 'react'
import Avaliation from './Avaliation'

export default function Comments() {
  const [openModal, setOpenModal] = useState(false)

  function handleUtil() {
    // console.log()
  }
  function handleShowMore() {
    setOpenModal(true)
  }

  return (
    <>
      <DialogRoot open={openModal}>
        <Dialog offClosed title="Avaliação">
          <Avaliation onClose={() => setOpenModal(false)} />
        </Dialog>
      </DialogRoot>
      <CommentsContainer>
        <CommentsHeader>
          <Text size="2xl"> 5/5 </Text>
          <Text size="sm"> (20 avaliaçoes) </Text>
        </CommentsHeader>
        <CommentsWrappers>
          <Row>
            <Col lg={4}>
              <CommentsBox>
                <Text as="strong">Joao</Text>

                <StarsWrapper>
                  <FaStar size={16} />
                  <FaStar size={16} />
                  <FaStar size={16} />
                  <FaStar size={16} />
                  <FaStarHalfAlt size={16} />
                </StarsWrapper>
                <Text as="small" size="xs">
                  Avaliado em 01/09/2010
                </Text>
                <Heading as="h4">Placa potente</Heading>
                <CropText>
                  <Text>
                    Placa muito silenciosa, competente e gelada. Jogo em Full HD
                    sempre com tudo no máximo e ela empurra com sobra.,
                    Silenciosa, fria e competente., Pra quem gosta aparência
                    extravagante talvez não agrade o design minimalista e
                    simples da placa.
                  </Text>
                </CropText>
                <ShowMore>
                  <BtnMore onClick={handleShowMore}>Ver mais</BtnMore>
                </ShowMore>

                <Util>
                  <BtnUtil onClick={handleUtil}>
                    <ThumbsUp size={16} />
                    Útil (1)
                  </BtnUtil>
                </Util>
              </CommentsBox>
            </Col>
            <Col lg={4}>
              <CommentsBox>
                <Text as="strong">Maria</Text>

                <StarsWrapper>
                  <FaStar size={16} />
                  <FaStar size={16} />
                  <FaStar size={16} />
                  <FaStar size={16} />
                  <FaStarHalfAlt size={16} />
                </StarsWrapper>
                <Text as="small" size="xs">
                  Avaliado em 01/09/2010
                </Text>
                <Heading as="h4">Otimo para 1080</Heading>
                <CropText>
                  <Text>
                    Placa muito silenciosa, competente e gelada. Jogo em Full HD
                    sempre com tudo no máximo e ela empurra com sobra.,
                    Silenciosa, fria e competente., Pra quem gosta aparência
                    extravagante talvez não agrade o design minimalista e
                    simples da placa.
                  </Text>
                </CropText>
                <ShowMore>
                  <BtnMore onClick={handleShowMore}>Ver mais</BtnMore>
                </ShowMore>

                <Util>
                  <BtnUtil onClick={handleUtil}>
                    <ThumbsUp size={16} />
                    Útil (1)
                  </BtnUtil>
                </Util>
              </CommentsBox>
            </Col>
            <Col lg={4}>
              <CommentsBox>
                <Text as="strong">Anonimo</Text>

                <StarsWrapper>
                  <FaStar size={16} />
                  <FaStar size={16} />
                  <FaStar size={16} />
                  <FaStar size={16} />
                  <FaStarHalfAlt size={16} />
                </StarsWrapper>
                <Text as="small" size="xs">
                  Avaliado em 01/09/2010
                </Text>
                <Heading as="h4">Muito boa!</Heading>
                <CropText>
                  <Text>
                    Fiquei preocupado porque vi uma série de gente falando mal
                    da placa da linha 4.000, que as 3060 eram melhores e mais
                    baratas, mas sinceramente essa placa é um espetáculo! Estou
                    jogando dayz a 200fps e CS a 400fps! O consumo de energia
                    dela é metade da 3060 (~170W contra ~340W), logo você
                    precisa de uma fonte menor pra fazer o que a 3060 faz e com
                    mais capacidade. As duas fans dela não deixam pra trás no
                    arrefecimento, praticamente nem liga automaticamente em
                    muitas coisas que faço, e dão conta do recado tranquilinho.
                    Estou muito feliz com a placa!, Consumo de energia
                    Capacidade de processar gráficos
                  </Text>
                </CropText>
                <ShowMore>
                  <BtnMore onClick={handleShowMore}>Ver mais</BtnMore>
                </ShowMore>

                <Util>
                  <BtnUtil onClick={handleUtil}>
                    <ThumbsUp size={16} />
                    Útil (1)
                  </BtnUtil>
                </Util>
              </CommentsBox>
            </Col>
            <Col lg={4}>
              <CommentsBox>
                <Text as="strong">Jaqueline</Text>

                <StarsWrapper>
                  <FaStar size={16} />
                  <FaStar size={16} />
                  <FaStar size={16} />
                  <FaStar size={16} />
                  <FaStarHalfAlt size={16} />
                </StarsWrapper>
                <Text as="small" size="xs">
                  Avaliado em 01/09/2010
                </Text>
                <Heading as="h4">Ótima placa</Heading>
                <CropText>
                  <Text>Cumpriu o que eu esperava dela.</Text>
                </CropText>
                <ShowMore>
                  <BtnMore onClick={handleShowMore}>Ver mais</BtnMore>
                </ShowMore>

                <Util>
                  <BtnUtil onClick={handleUtil}>
                    <ThumbsUp size={16} />
                    Útil (1)
                  </BtnUtil>
                </Util>
              </CommentsBox>
            </Col>
            <Col lg={4}>
              <CommentsBox>
                <Text as="strong">Gabriel</Text>

                <StarsWrapper>
                  <FaStar size={16} />
                  <FaStar size={16} />
                  <FaStar size={16} />
                  <FaStar size={16} />
                  <FaStarHalfAlt size={16} />
                </StarsWrapper>
                <Text as="small" size="xs">
                  Avaliado em 01/09/2010
                </Text>
                <Heading as="h4">Placa potente</Heading>
                <CropText>
                  <Text>
                    Placa muito silenciosa, competente e gelada. Jogo em Full HD
                    sempre com tudo no máximo e ela empurra com sobra.,
                    Silenciosa, fria e competente., Pra quem gosta aparência
                    extravagante talvez não agrade o design minimalista e
                    simples da placa.
                  </Text>
                </CropText>
                <ShowMore>
                  <BtnMore onClick={handleShowMore}>Ver mais</BtnMore>
                </ShowMore>

                <Util>
                  <BtnUtil onClick={handleUtil}>
                    <ThumbsUp size={16} />
                    Útil (1)
                  </BtnUtil>
                </Util>
              </CommentsBox>
            </Col>
            <Col lg={4}>
              <CommentsBox>
                <Text as="strong">Jose</Text>

                <StarsWrapper>
                  <FaStar size={16} />
                  <FaStar size={16} />
                  <FaStar size={16} />
                  <FaStar size={16} />
                  <FaStarHalfAlt size={16} />
                </StarsWrapper>
                <Text as="small" size="xs">
                  Avaliado em 01/09/2010
                </Text>
                <Heading as="h4">Placa potente</Heading>
                <CropText>
                  <Text>
                    Placa muito silenciosa, competente e gelada. Jogo em Full HD
                    sempre com tudo no máximo e ela empurra com sobra.,
                    Silenciosa, fria e competente., Pra quem gosta aparência
                    extravagante talvez não agrade o design minimalista e
                    simples da placa.
                  </Text>
                </CropText>
                <ShowMore>
                  <BtnMore onClick={handleShowMore}>Ver mais</BtnMore>
                </ShowMore>

                <Util>
                  <BtnUtil onClick={handleUtil}>
                    <ThumbsUp size={16} />
                    Útil (1)
                  </BtnUtil>
                </Util>
              </CommentsBox>
            </Col>
            <Col lg={4}>
              <CommentsBox>
                <Text as="strong">Bernado</Text>

                <StarsWrapper>
                  <FaStar size={16} />
                  <FaStar size={16} />
                  <FaStar size={16} />
                  <FaStar size={16} />
                  <FaStarHalfAlt size={16} />
                </StarsWrapper>
                <Text as="small" size="xs">
                  Avaliado em 01/09/2010
                </Text>
                <Heading as="h4">Placa potente</Heading>
                <CropText>
                  <Text>
                    Placa muito silenciosa, competente e gelada. Jogo em Full HD
                    sempre com tudo no máximo e ela empurra com sobra.,
                    Silenciosa, fria e competente., Pra quem gosta aparência
                    extravagante talvez não agrade o design minimalista e
                    simples da placa.
                  </Text>
                </CropText>
                <ShowMore>
                  <BtnMore onClick={handleShowMore}>Ver mais</BtnMore>
                </ShowMore>

                <Util>
                  <BtnUtil onClick={handleUtil}>
                    <ThumbsUp size={16} />
                    Útil (1)
                  </BtnUtil>
                </Util>
              </CommentsBox>
            </Col>
            <Col lg={4}>
              <CommentsBox>
                <Text as="strong">Matheus</Text>

                <StarsWrapper>
                  <FaStar size={16} />
                  <FaStar size={16} />
                  <FaStar size={16} />
                  <FaStar size={16} />
                  <FaStarHalfAlt size={16} />
                </StarsWrapper>
                <Text as="small" size="xs">
                  Avaliado em 01/09/2010
                </Text>
                <Heading as="h4">Placa potente</Heading>
                <CropText>
                  <Text>
                    Placa muito silenciosa, competente e gelada. Jogo em Full HD
                    sempre com tudo no máximo e ela empurra com sobra.,
                    Silenciosa, fria e competente., Pra quem gosta aparência
                    extravagante talvez não agrade o design minimalista e
                    simples da placa.
                  </Text>
                </CropText>
                <ShowMore>
                  <BtnMore onClick={handleShowMore}>Ver mais</BtnMore>
                </ShowMore>

                <Util>
                  <BtnUtil onClick={handleUtil}>
                    <ThumbsUp size={16} />
                    Útil (1)
                  </BtnUtil>
                </Util>
              </CommentsBox>
            </Col>
          </Row>
        </CommentsWrappers>
      </CommentsContainer>
    </>
  )
}
