import { styled } from '@lemonade-technologies-hub-ui/react'

export const AddProductContent = styled('div', {
  transform: 'translateX(130px)',
  transition: 'all ease-in-out 0.4s',

  variants: {
    isAdded: {
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

export const Clip = styled('div', {
  fontSize: '8px',
  width: '11px',
  height: '11px',
  background: '#f00a0a',
  borderRadius: '100%',

  position: 'absolute',
  top: '7px',
  left: '18px',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

export const AddWrapper = styled('div', {
  width: '$10',
  height: '$10',

  position: 'relative',

  background: '#ffffffbb',
  border: '1px solid $gray200',
  borderRadius: '100%',

  display: 'flex',
  flexWrap: 'wrap',
  placeContent: 'center',
})

export const BtnAdd = styled('button', {
  all: 'unset',

  display: 'flex',
  alignItems: 'center',
  gap: '$2',

  svg: {
    fontSize: '$lg',
    color: '$gray400',
  },
})
