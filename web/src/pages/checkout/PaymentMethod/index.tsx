import { Radio } from '@/components/Radio'

import {
  BtnPaymentSelect,
  PaymentMethodContainer,
  SwitchPayment,
} from './styles'
import { Text } from '@lemonade-technologies-hub-ui/react'

export type OnPayment = 'ticket' | 'pix' | 'card' | null

interface PaymentMethodProps {
  method: OnPayment
  onTypeMethod: (method: OnPayment) => void
}

export function PaymentMethod({ method, onTypeMethod }: PaymentMethodProps) {
  function handleSwitchPayment(payment: OnPayment) {
    onTypeMethod(payment)
  }

  return (
    <PaymentMethodContainer>
      <SwitchPayment>
        <BtnPaymentSelect onClick={() => handleSwitchPayment('ticket')}>
          <Radio selected={method !== 'ticket'} />
          <Text as="span">Boleto</Text>
        </BtnPaymentSelect>
        <BtnPaymentSelect onClick={() => handleSwitchPayment('pix')}>
          <Radio selected={method !== 'pix'} />
          <Text as="span">Pix</Text>
        </BtnPaymentSelect>
        <BtnPaymentSelect onClick={() => handleSwitchPayment('card')}>
          <Radio selected={method !== 'card'} />
          <Text as="span">Cartão</Text>
        </BtnPaymentSelect>
      </SwitchPayment>
    </PaymentMethodContainer>
  )
}
