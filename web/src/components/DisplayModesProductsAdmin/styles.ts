import { Text, styled } from '@lemonade-technologies-hub-ui/react'

export const DisplayModesProductsContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  borderRadius: '$xs',
  border: '1px solid $gray100',
  padding: '$2',

  '@media (max-width: 630px)': {
    flexDirection: 'column',
    gap: '$2',
  },

  boxShadow: 'rgba(0, 0, 0, 0.137) 1px 1px 3px',
})

export const FilterAdvanced = styled('div', {})

export const BtnFilterAdv = styled('button', {
  all: 'unset',
  height: '40px',
  width: '40px',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  borderRadius: '$xs',

  background: '$gray100',

  svg: {
    color: '$gray400',
    transition: 'all ease-in-out 0.2s',
  },

  '&:hover': {
    svg: {
      color: '$alosixG200',
    },
  },

  variants: {
    hasQueries: {
      true: {
        background: '$alosixG200',

        svg: {
          color: '$white',
        },

        '&:hover': {
          svg: {
            color: '$alosixY300',
          },
        },
      },
    },
  },
})

export const QuerysSearch = styled('div', {
  display: 'flex',
  gap: '$4',
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
