import { Box, Text, styled } from '@lemonade-technologies-hub-ui/react'

export const TimeDiscountContainer = styled('div', {})

export const TimeDiscountWrapper = styled(Box, {
  padding: '$4',
})

export const ProductsWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
  height: '100px',

  '> ul': {},

  variants: {
    isMulti: {
      true: {
        overflowY: 'scroll',
      },
    },
  },
})

export const BtnGoTimeDiscount = styled('button', {})

export const TimeDiscountHeader = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',

  a: {
    textDecoration: 'none',
  },

  [`a > ${Text}`]: {
    fontSize: '$xs',
    textTransform: 'uppercase',
  },

  '> div': {
    display: 'flex',
    gap: '$8',
  },
})

export const ProductSingle = styled('li', {
  a: {
    textDecoration: 'none',

    [`${Text}`]: {
      transition: 'all ease-in-out 0.1s',
    },

    [`&:hover ${Text}`]: {
      color: '$alosixG200',
    },
  },
})

export const WrapperDates = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
})
