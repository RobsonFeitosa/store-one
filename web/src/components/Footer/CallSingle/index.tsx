import { Container, Row } from 'react-bootstrap'
import { CallItem, CallSingleContainer, CallsingleContent, Hr } from './styles'
import { Calendar, CreditCard, PhoneCall, Truck } from 'phosphor-react'
import { Text } from '@lemonade-technologies-hub-ui/react'

export default function CallSingle() {
  return (
    <CallSingleContainer>
      <Container>
        <Row>
          <CallsingleContent>
            <div>
              <CallItem>
                <Truck size={43} />
                <div>
                  <Text as="strong">Entrega</Text>
                  <Text as="span">Gratuita pela região</Text>
                </div>
              </CallItem>
            </div>
            <div>
              <CallItem>
                <PhoneCall size={43} />
                <div>
                  <Text as="strong">Suporte</Text>
                  <Text as="span">24*7 em boas mãos</Text>
                </div>
              </CallItem>
            </div>
            <div>
              <CallItem>
                <Calendar size={43} />
                <div>
                  <Text as="strong">Agenda operacional</Text>
                  <Text as="span">Seus compromissos bem organizado</Text>
                </div>
              </CallItem>
            </div>
            <div>
              <CallItem>
                <CreditCard size={43} />
                <div>
                  <Text as="strong">Metodos de pagamento</Text>
                  <Text as="span">Pix, Boleto, Cartão (débido/credito)</Text>
                </div>
              </CallItem>
            </div>
          </CallsingleContent>

          <Hr />
        </Row>
      </Container>
    </CallSingleContainer>
  )
}
