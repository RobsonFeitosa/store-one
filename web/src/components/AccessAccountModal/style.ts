import { Button, styled } from '@lemonade-technologies-hub-ui/react'

export const AccessAccountModalContainer = styled('div', {})

export const Form = styled('form', {
  marginTop: '$4',
  marginBottom: '$4',
  width: '32rem',

  '@media (max-width: 768px)': {
    width: '100%',
  },

  '> a': {
    marginTop: '0.625rem',
    display: 'block',
    color: '#209cd8',
    textDecoration: 'none',
  },

  '> div': {
    marginBottom: '$2',
  },

  '> button': {
    marginTop: '$4',
  },
})

export const ButtonForm = styled(Button, {
  width: '100%',
})

export const LinkWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '$4',

  a: {
    textDecoration: 'none',
  },

  '> a:first-child': {
    color: '$alosixG300',
  },

  '> a:last-child': {
    svg: {
      marginRight: '$2',
    },
  },
})

export const BtnSendForgot = styled('button', {
  all: 'unset',
  color: '$alosixG300',
})

export const SessionGoogle = styled('div', {
  display: 'flex',
  justifyContent: 'center',
})

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
    color: '#5c9d3d',

    svg: {
      marginRight: '0.5rem',
      fontSize: '1rem',
    },
  },
})
