import { Text, styled } from '@lemonade-technologies-hub-ui/react'

export const DisplayModesProductsContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  borderRadius: '$md',
  border: '1px solid $gray100',
  padding: '$2',

  marginBottom: '$4',
  marginTop: '$4',

  '@media (max-width: 630px)': {
    flexDirection: 'column',
    gap: '$2',
  },
})

export const ModeGrid = styled('div', {
  '> div': {
    display: 'flex',
    gap: '$2',
  },
})

export const BtnShowGrid = styled('button', {
  all: 'unset',

  border: '1px solid $gray100',
  borderRadius: '$sm',

  color: '$gray400',
  padding: '$1',
  transition: 'all ease-in-out 0.2s',

  variants: {
    actived: {
      true: {
        color: '$black',
      },
    },
  },
})

export const ShortProducts = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$4',

  '@media (max-width: 490px)': {
    [`> ${Text}`]: {
      display: 'none',
    },
  },
})

export const SelectedBox = styled('div', {
  width: '250px',
})

export const Total = styled('div', {})
