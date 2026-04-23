import { Text, styled } from '@lemonade-technologies-hub-ui/react'
import Link from 'next/link'

export const ProductContentContainer = styled('div', {
  position: 'relative',
})

export const WrapperPrice = styled('div', {})

export const ImageWrapper = styled('div', {
  height: '80px',
  width: '100px',
  position: 'relative',
  background: '$gray100',
  // border: '1px solid $gray200',
  boxShadow: '1px 0px 2px #00000023',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

export const CropLink = styled(Link, {
  [`${Text}`]: {
    display: '-webkit-box',
    '-webkit-line-clamp': 3,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',
  },
})

export const CategoriesClip = styled('div', {
  '> div': {
    border: '1px solid $gray100',
    padding: '0px 4px',
    borderRadius: '$sm',
    background: '$alosixG200',

    width: 'auto',
    display: 'inline-block',

    lineHeight: 'normal',
  },

  [`${Text}`]: {
    color: '$white',

    fontSize: '$xs',
  },

  [`> ${Text}`]: {
    color: '$gray600',
  },
})

export const QuantityWrapper = styled('div', {
  display: 'flex',
  gap: '$4',
})

export const WeigthWrapper = styled('div', {})
export const DimensionsWrapper = styled('div', {})

export const ProductsWrapper = styled('div', {
  display: 'grid',
  gridTemplateColumns: '100px auto 5% 10% 10% 6% 22%',
  alignItems: 'center',
  gap: '$8',

  borderBottom: '1px solid $gray200',
  padding: '$4 0',

  a: {
    textDecoration: 'none',
  },

  variants: {
    isList: {
      false: {
        display: 'flex',
        flexDirection: 'column',
        gap: '$4',

        [`${WrapperPrice}`]: {
          display: 'flex',
          gap: '$4',
        },

        [`${WeigthWrapper}`]: {
          display: 'flex',
        },

        [`${DimensionsWrapper}`]: {
          display: 'inline-block',
          textAlign: 'center',

          p: {
            display: 'inline-block',
            margin: '0 10px',
          },
        },
      },
    },
  },
})

