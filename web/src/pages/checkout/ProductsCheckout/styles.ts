import { Heading, Text, styled } from '@lemonade-technologies-hub-ui/react'

export const ProductsCheckoutContainer = styled('div', {
  border: '1px solid $gray200',

  [`> ${Text}`]: {
    padding: '$4',
  },
})

export const ProductCkeckout = styled('div', {
  padding: '$4 $2',
  borderBottom: '1px solid $gray200',

  display: 'flex',
  gap: '$4',

  '&:last-child': {
    border: 0,
  },
})

export const BtnToGoProduct = styled('button', {
  all: 'unset',
  marginBottom: '10px',

  [`> ${Text}`]: {
    lineHeight: 1.5,
    display: 'block',
  },
})

export const WrapperCoupon = styled('div', {
  padding: '$4',
  border: '2px solid #b1770ee3',
  background: '#f9a712e3',

  marginTop: '$4',

  [`${Text}`]: {
    fontWeight: '$bold',
  },
})

export const DescriptionWrapper = styled('div', {
  width: '100%',

  [`${Heading}`]: {
    fontSize: '$sm',
    fontWeight: '$medium',
    marginBottom: '10px',
  },

  [`> ${Text}`]: {
    fontSize: '$xs',
  },

  '> div': {
    display: 'flex',
    alignItems: 'center',
    gap: '$4',
  },
})

export const BtnRemoveOrder = styled('button', {
  all: 'unset',

  svg: {
    color: '$gray600',
  },
})
