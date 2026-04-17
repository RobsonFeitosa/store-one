import { Text } from '@lemonade-technologies-hub-ui/react'
import { BtnCopy, CopyCoupon, CouponWinContainer, Crop } from './styles'
import { FaCheck, FaCopy } from 'react-icons/fa6'
import { useState } from 'react'

export function CouponWin() {
  const [copied, setCopied] = useState(false)

  function handleCopy(coupon: string) {
    setCopied(true)
    navigator.clipboard.writeText(coupon)

    setTimeout(() => {
      setCopied(false)
    }, 15000)
  }

  return (
    <CouponWinContainer>
      <Text>
        Parabéns pelo seu primeiro acesso! Você acaba de ganhar um cupom de
        desconto válido para todos os produtos da nossa loja. Aproveite essa
        oportunidade para economizar e fazer ótimas compras
      </Text>
      <CopyCoupon>
        <Crop>
          <Text as="strong">COUPLJL13123</Text>
        </Crop>

        <BtnCopy type="button" onClick={() => handleCopy('COUPLJL13123')}>
          Copiar
          {!copied ? <FaCopy /> : <FaCheck />}
        </BtnCopy>
      </CopyCoupon>
    </CouponWinContainer>
  )
}
