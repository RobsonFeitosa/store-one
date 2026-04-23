import { styled } from '@lemonade-technologies-hub-ui/react'

export const FormCategoriesContainer = styled('div', {})

export const Form = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  color: '$alosixY500',
  gap: '$4',

  marginTop: '$4',

  hr: {
    margin: '$1',
  },

  '> button': {
    minWidth: '80px',
  },
})

