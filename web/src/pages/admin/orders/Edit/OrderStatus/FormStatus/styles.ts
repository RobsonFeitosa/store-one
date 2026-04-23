import { styled } from '@lemonade-technologies-hub-ui/react'

export const FormStatusContainer = styled('div', {})

export const Form = styled('div', {
  display: 'flex',
  color: '$alosixY500',
  gap: '$4',

  '> div': {
    width: '100%',
  },

  marginTop: '$4',

  hr: {
    margin: '$1',
  },
})
