import { Text, styled } from '@lemonade-technologies-hub-ui/react'

export const TimeDiscountContainer = styled('div', {})
export const TimeDiscountContent = styled('div', {})
export const BtnEditTimeDiscount = styled('button', {})
export const BtnRemoveTimeDiscount = styled('button', {})

export const ProductsWrapper = styled('div', {
  background: '$gray100',
  padding: '$4 $2',
})

export const TimeDiscountHeader = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',

  a: {
    textDecoration: 'none',
  },

  [`${Text}`]: {
    textTransform: 'uppercase',
  },
})

export const ProductSingle = styled('div', {})

export const WrapperDates = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
})
