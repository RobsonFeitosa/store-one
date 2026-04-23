import { Text, styled } from '@lemonade-technologies-hub-ui/react'

export const SchedullingContainer = styled('div', {
  hr: {
    margin: '$2 0',
  },
})

export const SchedullingSingle = styled('div', {
  padding: '$4',
  borderRadius: '$sm',
  background: '$gray100',

  minHeight: '214px',

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
})

export const SchedullingHeader = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
})

export const SchedullingContent = styled('div', {
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

export const WrapperDate = styled('div', {
  display: 'flex',
  gap: '$2',

  '> div': {
    display: 'flex',
    gap: '$2',
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

export const SchedullingFooter = styled('div', {
  display: 'flex',
  gap: '$4',
})
