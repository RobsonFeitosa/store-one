import { styled } from '@lemonade-technologies-hub-ui/react'

export const PaymentMethodContainer = styled('div', {})

export const SwitchPayment = styled('div', {
  display: 'flex',
  gap: '$6',

  svg: {
    color: '#gray500',
  },
})

export const BtnPaymentSelect = styled('button', {
  background: 'transparent',
  outline: 'none',
  border: 0,

  display: 'flex',
  alignItems: 'center',
  gap: '$2',
})
