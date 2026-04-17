import { Heading, Text, styled } from '@lemonade-technologies-hub-ui/react'

export const AddressContainer = styled('div', {})

export const AddressHeader = styled('div', {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: '$10',
  marginBottom: 20,

  [`${Heading}`]: {
    fontSize: '$md',
    margin: 0,
  },
})

export const AddressInfor = styled('div', {
  border: '1px solid #ff9900',
  padding: '15px 15px',
  marginBottom: 20,
  borderRadius: '$sm',

  [`${Text}`]: {
    color: '#ff9900',
    fontWeight: '$bold',

    display: 'flex',
    alignItems: 'center',
    gap: '$2',
  },
})

export const AddressesContainer = styled('div', {
  '> div > div': {
    marginBottom: 24,
  },
})

export const BtnAddNewAddress = styled('button', {
  all: 'unset',

  display: 'flex',
  alignItems: 'center',
  gap: '$2',

  fontSize: '$sm',
})
