import { Heading, Text, styled } from '@lemonade-technologies-hub-ui/react'

export const PageWrapper = styled('div', {
  backgroundColor: '#f8fafc',
  minHeight: '100vh',
  width: '100%',
})

export const CheckoutContainer = styled('div', {
  paddingTop: '$10',
  paddingBottom: '$20',
})

export const TotalOrder = styled(Text, {
  marginBottom: '$6',
  display: 'block',
  fontSize: '$xl',
  color: '$gray900',
  fontWeight: '$bold',
  textAlign: 'right',
})

export const WrapperCheckoutItem = styled('div', {
  background: '$white',
  borderRadius: '12px',
  padding: '$8',
  border: '1px solid $gray100',
  height: '100%',
  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)',
  transition: 'all 0.3s ease',

  '&:hover': {
    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    transform: 'translateY(-2px)',
  },

  [`& ${Heading}`]: {
    fontSize: '1.25rem',
    marginBottom: '$8',
    fontWeight: '700',
    color: '$gray900',
    display: 'flex',
    alignItems: 'center',
    gap: '$2',

    '&::before': {
      content: '""',
      width: '4px',
      height: '24px',
      background: '#f97316',
      borderRadius: '4px',
    }
  },

  'hr': {
    border: 0,
    borderTop: '1px solid $gray100',
    margin: '$8 0',
  },

  '.checkout-section-footer': {
    marginTop: 'auto',
    paddingTop: '$6',
  }
})
