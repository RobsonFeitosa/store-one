import { Text, styled } from '@lemonade-technologies-hub-ui/react'

export const VariationContainer = styled('div', {
  marginBottom: '$4',
  marginTop: '$4',
})

export const BtnVariantRemove = styled('button', {})

export const ImageWrapper = styled('div', {
  width: '110px',
})

export const InputControlLabel = styled('div', {
  position: 'absolute',
  top: '-58px',
  left: 0,
  background: '$white',

  '> div': {
    height: '30px',
    border: 0,
    paddingLeft: 0,
  },
})

export const ProductItem = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$4',

  [`> ${Text}`]: {
    width: '$40',
  },

  marginBottom: '$4',

  '&:last-child': {
    margin: 0,
  },
})

export const ProductItemTime = styled(ProductItem, {
  marginTop: '$20',

  '> div': {
    width: '100%',
  },

  [`> ${Text}`]: {
    textWrap: 'nowrap',
  },

  '&:last-child': {
    marginTop: '34px',
  },
})

