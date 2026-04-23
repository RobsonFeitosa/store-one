import { Text, styled } from '@lemonade-technologies-hub-ui/react'

export const ProductsContainer = styled('div', {
  marginBottom: '$8',
})

export const ProductsEmpty = styled('div', {
  padding: '10px 0',

  [`${Text}`]: {
    color: '$gray500',
  },
})

export const DisplaySwitch = styled('div', {
  height: 0,
  transition: 'all ease-in-out 0.2s',

  transform: 'translateY(-200px)',

  width: 'calc(100% - 340px)',
  background: '$white',

  position: 'fixed',
  zIndex: '999',

  variants: {
    isActived: {
      true: {
        height: '60px',
        transform: 'translateY(0)',
      },
    },
  },
})

export const ContentWrapper = styled('div', {
  transition: 'all ease-in-out 0.2s',
  transform: 'translateY(0)',
  variants: {
    isTopContent: {
      true: {
        transform: 'translateY(70px)',
      },
    },
  },
})

export const BtnDisplayOpen = styled('button', {
  all: 'unset',

  position: 'fixed',
  left: '50%',
  top: '18px',
  zIndex: '99999',

  variants: {
    isActived: {
      true: {
        svg: {
          color: '$alosixG200',
        },
      },
    },
  },
})

