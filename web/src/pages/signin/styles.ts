import { Heading, styled } from '@lemonade-technologies-hub-ui/react'

export const SignInContainer = styled('div', {})

export const SignInContent = styled('div', {
  padding: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'left',

  hr: {
    border: 0,
    borderTop: '1px solid rgba(0,0,0,0.3)',
  },

  placeContent: 'center',

  width: '100%',
  minHeight: '25rem',

  '@media (max-width: 30rem)': {
    minHeight: 'auto',
    marginBottom: '1.25rem',

    form: {
      width: '100%',
      padding: '0 0.625rem',
    },
  },

  '> a': {
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    color: '$alosixG300',

    svg: {
      marginRight: '0.5rem',
      fontSize: '1rem',
    },
  },
})

export const Wrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
})

export const BtnSendForgot = styled('button', {
  all: 'unset',
  color: '$alosixG300',
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

  [`> ${Heading}`]: {
    fontSize: '$lg',
    marginBottom: '$4',
  },

  '> div': {
    marginBottom: '$2',
  },

  '> button': {
    marginTop: '$4',
  },
})
