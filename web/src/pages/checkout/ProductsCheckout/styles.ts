import { Heading, Text, styled } from '@lemonade-technologies-hub-ui/react'

export const ProductsCheckoutContainer = styled('div', {
  [`> ${Text}`]: {
    padding: '$4',
    color: '$gray600',
    fontStyle: 'italic',
  },
})

export const ProductCkeckout = styled('div', {
  padding: '$4 0',
  borderBottom: '1px solid $gray100',
  display: 'flex',
  gap: '$4',
  transition: 'all 0.2s ease',

  '&:hover': {
    backgroundColor: '#fafafa',
    paddingLeft: '$2',
    borderRadius: '8px',
  },

  '&:last-child': {
    border: 0,
  },

  img: {
    borderRadius: '8px',
    objectFit: 'cover',
    border: '1px solid $gray100',
  }
})

export const BtnToGoProduct = styled('button', {
  all: 'unset',
  cursor: 'pointer',
  marginBottom: '4px',

  [`> ${Text}`]: {
    lineHeight: 1.4,
    display: 'block',
    fontSize: '$sm',
    fontWeight: '$bold',
    color: '$gray900',
    transition: 'color 0.2s ease',

    '&:hover': {
      color: '#f97316',
    }
  },
})

export const WrapperCoupon = styled('div', {
  padding: '$4',
  border: '1px dashed #f97316',
  background: '#fff7ed',
  borderRadius: '8px',
  marginTop: '$4',

  [`${Text}`]: {
    fontWeight: '$bold',
    color: '#9a3412',
  },
})

export const DescriptionWrapper = styled('div', {
  flex: 1,

  [`${Heading}`]: {
    fontSize: '$sm',
    fontWeight: '$medium',
    marginBottom: '4px',
    color: '$gray900',
  },

  [`> ${Text}`]: {
    fontSize: '$xs',
    color: '$gray600',
  },

  '> div': {
    display: 'flex',
    alignItems: 'center',
    gap: '$4',
    marginTop: '$2',
  },
})

export const BtnRemoveOrder = styled('button', {
  all: 'unset',
  cursor: 'pointer',
  padding: '$2',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.2s ease',

  '&:hover': {
    backgroundColor: '#fee2e2',
    svg: {
      color: '#ef4444',
    }
  },

  svg: {
    color: '$gray400',
  },
})
