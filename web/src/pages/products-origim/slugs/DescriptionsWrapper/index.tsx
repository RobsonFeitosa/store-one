/* eslint-disable react/no-unescaped-entities */
import { Container } from 'react-bootstrap'
import {
  BtnSwitch,
  DescriptionContent,
  DescriptionHeaders,
  DescriptionsWrapperContainer,
  ReturnShipping,
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
              <Text>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </Text>

              <Text>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </Text>
            </ReturnShipping>
          )}
        </DescriptionContent>
      </DescriptionsWrapperContainer>
    </Container>
  )
}
