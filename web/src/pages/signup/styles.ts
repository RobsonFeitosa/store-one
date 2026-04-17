import { Heading, styled } from '@lemonade-technologies-hub-ui/react'

export const SignupContainer = styled('div', {})

export const SignUpContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',

  placeContent: 'center',

  width: '100%',
  minHeight: '510px',

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

export const LabelCheckbox = styled('label', {
  marginTop: '$2',
  display: 'flex',
  alignItems: 'center',
  gap: '$2',

  span: {
    lineHeight: 'initial',
  },

  a: {
    fontSize: '$xs',
  },
})
