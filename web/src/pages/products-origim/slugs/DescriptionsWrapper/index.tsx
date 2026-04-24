/* eslint-disable react/no-unescaped-entities */
import { Container } from 'react-bootstrap'
import {
  BtnSwitch,
  DescriptionContent,
  DescriptionHeaders,
  DescriptionsWrapperContainer,
  ReturnShipping,
  SectionTitle,
} from './styles'
import { Text } from '@lemonade-technologies-hub-ui/react'
import { useEffect, useState } from 'react'
import Comments from './Comments'
import { IProductDTO } from '@/pages/dtos/product.dto'

type Mode = 'description' | 'comments' | 'shipping'

interface DescriptionsWrapperProps {
  isProduct: boolean
  product: IProductDTO | null
}

export default function DescriptionsWrapper({
  isProduct,
  product,
}: DescriptionsWrapperProps) {
  const [mode, setMode] = useState<Mode>('description')

  function handleChangeMode(name: Mode) {
    setMode(name)
  }

  const [description, setDescription] = useState('')

  useEffect(() => {
    if (product?.description) {
      setDescription(product.description)
    }
  }, [product])

  return (
    <Container>
      <DescriptionsWrapperContainer>
        <DescriptionHeaders>
          <BtnSwitch
            actived={mode === 'description'}
            onClick={() => handleChangeMode('description')}
          >
            Descrição
          </BtnSwitch>
          <BtnSwitch
            actived={mode === 'comments'}
            onClick={() => handleChangeMode('comments')}
          >
            Avaliaçoes dos usuários
          </BtnSwitch>
          {isProduct && (
            <BtnSwitch
              actived={mode === 'shipping'}
              onClick={() => handleChangeMode('shipping')}
            >
              Envio e devolução
            </BtnSwitch>
          )}
        </DescriptionHeaders>
        <DescriptionContent>
          {mode === 'description' && (
            <>
              {description && (
                <Text
                  className="content"
                  dangerouslySetInnerHTML={{
                    __html: description,
                  }}
                />
              )}
            </>
          )}

          {mode === 'comments' && <Comments />}

          {mode === 'shipping' && (
            <ReturnShipping>
              <SectionTitle>
                1. Trocas e Devoluções (O básico legal)
              </SectionTitle>
              <Text>
                <strong>Arrependimento de Compra:</strong> Você tem até 7 dias
                corridos após o recebimento do produto para desistir da compra
                e solicitar a devolução integral do seu dinheiro, conforme o
                Código de Defesa do Consumidor.
              </Text>
              <Text>
                <strong>Defeitos de Fabricação:</strong> Caso o produto
                apresente qualquer problema técnico, você tem até 90 dias
                (para eletrônicos e bens duráveis) para entrar em contato e
                solicitar o reparo ou a troca.
              </Text>
              <Text>
                <strong>Condições do Produto:</strong> Para que a devolução
                seja aceita, o produto deve estar na embalagem original, sem
                sinais de mau uso e com todos os acessórios inclusos.
              </Text>

              <SectionTitle>2. Política de Envio</SectionTitle>
              <Text>
                <strong>Prazo de Postagem:</strong> Após a aprovação do
                pagamento, nós preparamos e despachamos o seu pedido em até 2
                dias úteis.
              </Text>
              <Text>
                <strong>Rastreamento:</strong> Assim que o produto for
                postado, você receberá um código de rastreio automaticamente
                no seu e-mail para acompanhar a entrega em tempo real.
              </Text>
              <Text>
                <strong>Área de Entrega:</strong> Realizamos entregas em todo
                o território nacional via Correios e transportadoras
                parceiras.
              </Text>

              <SectionTitle>3. Como solicitar?</SectionTitle>
              <Text>
                Para qualquer um dos casos acima, basta enviar um e-mail para{' '}
                <strong>contato@minhaempresa.com</strong> ou entrar em contato
                pelo nosso WhatsApp de suporte com o número do seu pedido.
                Nossa equipe responderá em até 24h úteis.
              </Text>
            </ReturnShipping>
          )}
        </DescriptionContent>
      </DescriptionsWrapperContainer>
    </Container>
  )
}
