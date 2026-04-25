import { styled } from '@lemonade-technologies-hub-ui/react'

export const PaymentMethodContainer = styled('div', {
  marginTop: '$4',
})

export const SwitchPayment = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$3',

  svg: {
    color: '$gray500',
  },
})

export const BtnPaymentSelect = styled('button', {
  background: 'transparent',
  outline: 'none',
  border: '1px solid $gray200',
  borderRadius: '8px',
  padding: '$4',
  cursor: 'pointer',
  transition: 'all 0.2s ease',

  display: 'flex',
  alignItems: 'center',
  gap: '$4',

  '&:hover': {
    backgroundColor: '#f8fafc',
    borderColor: '$gray300',
  },

  variants: {
    active: {
      true: {
        borderColor: '#f97316',
        backgroundColor: '#fff7ed',
        '&:hover': {
          backgroundColor: '#fff7ed',
        }
      }
    }
  }
})
