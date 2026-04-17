import { styled } from '@lemonade-technologies-hub-ui/react'

export const WishProductContent = styled('div', {
  transform: 'translateX(130px)',
  transition: 'all ease-in-out 0.4s',

  variants: {
    isWish: {
      true: {
        transform: 'translateX(0)',

        svg: {
          color: '#f00a0a',
        },
      },
    },
    size: {
      sm: {
        transform: 'translateX(-120px)',
      },
      xs: {
        transform: 'translateX(-120px)',
      },
    },
  },
})

export const WishWrapper = styled('div', {
  width: '$10',
  height: '$10',

  background: '#ffffffbb',
  border: '1px solid $gray200',
  borderRadius: '100%',

  display: 'flex',
  flexWrap: 'wrap',
  placeContent: 'center',
})

export const BtnWish = styled('button', {
  all: 'unset',

  display: 'flex',
  alignItems: 'center',
  gap: '$2',

  svg: {
    fontSize: '$lg',
    color: '$gray400',
  },
})
