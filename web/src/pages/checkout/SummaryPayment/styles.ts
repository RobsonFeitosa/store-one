import { Text, styled } from '@lemonade-technologies-hub-ui/react'

export const SummaryPaymentContainer = styled('div', {
  background: '#f8fafc',
  padding: '$6',
  borderRadius: '8px',
  border: '1px solid $gray100',
})

export const WrapperTotal = styled('div', {
  marginTop: '$6',

  [`${Text}`]: {
    display: 'block',
    lineHeight: 1.6,
  },
})

export const SummaryProduct = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',

  marginBottom: '$3',
  paddingBottom: '$3',

  borderBottom: '1px solid $gray100',

  '&:last-child': {
    border: 0,
    marginBottom: 0,
    paddingBottom: 0,
  },

  [`${Text}`]: {
    fontSize: '$sm',
    color: '$gray600',
  }
})
