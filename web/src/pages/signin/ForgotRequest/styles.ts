import { Text, styled } from '@lemonade-technologies-hub-ui/react'

export const ForgotContainer = styled('div', {
  marginTop: '$4',
})

export const Form = styled('form', {
  width: '28.75rem',
  marginBottom: '1.875rem',

  '> a': {
    marginTop: '0.625rem',
    display: 'block',
    color: '#209cd8',
    textDecoration: 'none',
  },

  [`> ${Text}`]: {
    marginBottom: '$2',
  },

  '> div': {
    marginBottom: '$2',
  },

  '> button': {
    marginTop: '$4',
  },
})
