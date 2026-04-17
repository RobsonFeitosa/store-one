import { HeartStraight, Heartbeat } from 'phosphor-react'
import { BtnWish, WishProductContent, WishWrapper } from './styles'
import { Text } from '@lemonade-technologies-hub-ui/react'
import { useWishes } from '@/hooks/providers/wishes'

interface WishProductProps {
  productId: string
  label?: string
  size?: 'sm' | 'xs'
}

export default function WishProduct({
  productId,
  label,
  size,
}: WishProductProps) {
  const { wishes, toggleWish } = useWishes()

  function handleWish() {
    toggleWish(productId)
  }

  const isWishe = wishes.includes(productId)

  return (
    <WishProductContent isWish={isWishe} size={size}>
      <BtnWish onClick={handleWish}>
        <WishWrapper>{isWishe ? <HeartStraight /> : <Heartbeat />}</WishWrapper>

        {label && <Text>{label}</Text>}
      </BtnWish>
    </WishProductContent>
  )
}
