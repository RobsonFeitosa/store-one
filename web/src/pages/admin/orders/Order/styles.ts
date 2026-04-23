import { Text, styled } from '@lemonade-technologies-hub-ui/react'

export const OrderContainer = styled('div', {
  hr: {
    margin: '$2 0',
  },
})

export const OrderSingle = styled('div', {
  padding: '$4',
  borderRadius: '$sm',
  background: '$gray100',

  minHeight: '214px',

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
})

export const OrderHeader = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
})

export const OrderContent = styled('div', {
  '> div': {
    margin: '$4 0',

    display: 'flex',
    justifyContent: 'space-between',

    // ' > div': {
    //   display: 'flex',
    //   justifyContent: 'space-between',
    // },
  },
})

export const BoxWhite = styled('div', {
  background: '$white',
  padding: '4px $2',
  margin: '$2 0',
  borderRadius: '$xs',

  [`${Text}`]: {
    color: '$gray500',
  },
})

export const BtnEdit = styled('button', {
  all: 'unset',

  outline: 'none',
  background: '$alosixG200',
  border: 0,

  borderRadius: '$xs',
  fontSize: '$xs',
  padding: '2px 6px',

  color: '$white',
  marginTop: '5px',
})
