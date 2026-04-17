import { Heading, styled } from '@lemonade-technologies-hub-ui/react'

export const OrdersContainer = styled('div', {
  [`${Heading}`]: {
    fontSize: '$md',
  },
})

export const OrderHeader = styled('div', {
  marginBottom: 20,
})

export const OrdersContent = styled('div', {
  '> div > div': {
    marginBottom: 20,
  },
})
