import { Text, styled } from '@lemonade-technologies-hub-ui/react'

export const SimulatePaymentContainer = styled('div', {
  [`> ${Text}`]: {
    color: '$alosixG200',
    textAlign: 'center',
    marginTop: '$4',

    '&:first-child': {
      margin: 0,
    },

    '&:last-child': {
      color: '$gray800',
    },
  },
})
