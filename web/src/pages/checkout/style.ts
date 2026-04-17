import { Heading, Text, styled } from '@lemonade-technologies-hub-ui/react'

export const CheckoutContainer = styled('div', {
  paddingTop: '$4',
})

export const TotalOrder = styled(Text, {
  marginBottom: '$6',
  display: 'block',
})

export const WrapperCheckoutItem = styled('div', {
  [` ${Heading}`]: {
    fontSize: '$lg',
    marginBottom: '$4',
    fontWeight: 'bold',
  },
})
