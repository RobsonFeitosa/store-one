import { Text, styled } from '@lemonade-technologies-hub-ui/react'

export const SummaryPaymentContainer = styled('div', {
  background: '$gray100',
  padding: '$4',
})

export const WrapperTotal = styled('div', {
  marginTop: '20px',

  [`${Text}`]: {
    display: 'block',
  },
})

export const SummaryProduct = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',

  marginBottom: '$2',
  paddingBottom: '$2',

  borderBottom: '1px solid $gray200',
})
