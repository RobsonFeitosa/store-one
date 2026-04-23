import { styled } from '@lemonade-technologies-hub-ui/react'

export const TimeDiscountContentContainer = styled('div', {
  marginBottom: '$4',
  marginTop: '20px',

  '> div > div': {
    marginBottom: '25px',
  },
})

export const TimeDiscountHeader = styled('div', {
  position: 'relative',
})

export const Empty = styled('div', {})

export const BtnNewTimeDiscount = styled('button', {
  all: 'unset',

  position: 'absolute',
  right: 0,
  top: 0,

  background: '$alosixG200',
  fontSize: '$sm',

  borderRadius: '$xs',
  padding: '2px $2',
  color: '$white',
})
