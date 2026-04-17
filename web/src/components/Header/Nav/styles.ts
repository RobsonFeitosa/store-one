import { Text, styled } from '@lemonade-technologies-hub-ui/react'

export const NavContainer = styled('div', {
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'space-between',

  position: 'relative',

  height: 50,
  padding: '0 $4',

  background: '$alosixG300',

  [`${Text}`]: {
    color: '$white',
    opacity: 0.8,
  },

  '@media (max-width: 700px)': {
    display: 'none',
  },

  color: '#ffffffd1',

  '@media (max-width: 768px)': {
    'span, p': {
      fontSize: '$xs',
    },
  },
})

export const Descount = styled('div', {
  display: 'flex',
  alignItems: 'center',
  color: '#e2e39e',

  [`> ${Text}`]: {
    marginTop: '0.125rem',
    marginLeft: '0.5rem',
  },
})

export const Primary = styled('div', {
  '> span': {
    marginRight: '20px',
  },
})

export const MyOrder = styled('div', {
  marginRight: '0',
  display: 'flex',
  position: 'relative',

  alignItems: 'center',
})

export const BtnMoreBill = styled('button', {
  background: 'transparent',
  outline: 'none',
  border: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: '#e2e39e',
})
