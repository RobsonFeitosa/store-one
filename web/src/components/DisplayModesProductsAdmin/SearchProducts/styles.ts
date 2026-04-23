import { Text, TextInput, styled } from '@lemonade-technologies-hub-ui/react'

export const SearchProductsContainer = styled('div', {})

export const Form = styled('div', {
  display: 'flex',
  gap: '$4',

  border: '1px solid $gray200',
  borderRadius: '$xs',

  '> div': {
    border: 0,
  },
})

export const TextInputCustom = styled(TextInput, {
  width: 300,
})

export const BtnSearch = styled('button', {
  all: 'unset',
  padding: '$2',

  display: 'flex',
  gap: '$2',

  [`${Text}`]: {
    transition: 'all ease-in-out 0.2s',
  },

  svg: {
    transition: 'all ease-in-out 0.2s',
  },

  '&:hover': {
    [`${Text}`]: {
      color: '$alosixG200',
    },

    svg: {
      color: '$alosixG200',
    },
  },
})
