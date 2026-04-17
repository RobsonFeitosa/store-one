import { Text, TextInput, styled } from '@lemonade-technologies-hub-ui/react'

export const NewsletterContainer = styled('div', {
  background: '#FF9900',

  padding: '$8 0',
  margin: '$20 0',
  display: 'block',
  marginBottom: '$12',

  '@media (max-width: 700px)': {
    marginBottom: '$6',
  },
})

export const NewsletterLabels = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$4',

  [`> ${Text}`]: {
    color: '$black',
    fontSize: '$lg',
  },

  svg: {
    color: '$black',
  },

  '@media (max-width: 980px)': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '$4',
  },

  '@media (max-width: 990px)': {},
})

export const NewsletterContent = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  gap: '$20',

  '@media (max-width: 980px)': {
    display: 'block',
  },
})

export const TextInputCustom = styled(TextInput, {
  color: '#FF9900',
  width: '500px',

  padding: '$4',

  '@media (max-width: 1200px)': {
    width: '300px',
  },

  '&::placeholder': {
    color: '#FF9900',
  },

  '@media (max-width: 980px)': {
    width: '100%',
  },
})

export const Form = styled('div', {
  display: 'flex',
  width: '100%',
  color: '$alosixY500',
  borderRadius: '$sm',
  background: '#A06000',

  '> div:first-child': {
    border: 0,
  },

  '@media (max-width: 990px)': {
    '> div:first-child': {
      width: '100%',
    },
  },
})

export const Hr = styled('hr', {
  width: '2px',
  height: '22px',
  background: '#FF9900',
  position: 'relative',
  top: '14px',
  margin: 0,
  padding: 0,
})

export const ButtonNewsletter = styled('button', {
  all: 'unset',
  width: '149px',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '6px',
  fontWeight: '$regular',

  textWrap: 'nowrap',

  height: '2.8rem',
  minWidth: '106px',
  padding: 0,

  color: '#FF9900',
})
