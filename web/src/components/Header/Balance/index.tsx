import { Heading, Text } from '@lemonade-technologies-hub-ui/react'
import formatValue from '@/utils/formatValue'
import { useOrder } from '@/hooks/providers/order'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { PaintBrushHousehold, Trash } from 'phosphor-react'

import {
  BalanceContainer,
  BtnClean,
  BtnFinish,
  BtnRemoveOrder,
  ContentBalance,
  DescriptionWrapper,
  FinishOrder,
  HeaderBalance,
  ProductSingle,
} from './styles'
import { useAuth } from '@/hooks/providers/auth'

export default function Balance() {
  const { order, removeProductOrder, setEmptyOrder, toggleBalance } = useOrder()
  const router = useRouter()
  const { user } = useAuth()

  const total = order.items.reduce((acc, product) => {
    return acc + product.price * product.quantity
  }, 0)

  function goToCheckout() {
    if (!user) {
      router.push('/signin')
    } else {
      router.push('/checkout')
      toggleBalance(false)
    }
  }

  function handleRemoveOrder(productId: string) {
    removeProductOrder(productId)
  }

  return (
    <BalanceContainer>
      <div>
        <HeaderBalance>
          <Heading as="h5">Carrinho</Heading>
          <Text as="strong">Total: {formatValue(total)}</Text>
        </HeaderBalance>
        <hr />

        <ContentBalance>
          {order.items.map((product) => (
            <ProductSingle key={product.id}>
              <div>
                {product.pictureUrl && (
                  <Image
                    src={product.pictureUrl}
                    width={60}
                    height={60}
                    alt={product.id}
                  />
                )}
                <DescriptionWrapper>
                  <Heading as="h3">{product.name}</Heading>
                  <div>
                    <Text>{product.quantity}</Text>
                    <Text as="small">x</Text>
                    {product.price && <Text>{formatValue(product.price)}</Text>}
                  </div>
                </DescriptionWrapper>
              </div>

              <BtnRemoveOrder onClick={() => handleRemoveOrder(product.id)}>
                <Trash size={20} />
              </BtnRemoveOrder>
            </ProductSingle>
          ))}
        </ContentBalance>

        <FinishOrder>
          <BtnFinish size={'sm'} onClick={goToCheckout}>
            Fechar pedido
          </BtnFinish>
          <BtnClean onClick={setEmptyOrder}>
            <PaintBrushHousehold /> limpar
          </BtnClean>
        </FinishOrder>
      </div>
    </BalanceContainer>
  )
}
