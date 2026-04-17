import { Heading, Text, styled } from '@lemonade-technologies-hub-ui/react'

export const AddressSingleContainer = styled('div', {
  background: '$gray100',
  borderRadius: '$sm',
  padding: 20,
  height: 110,
  paddingRight: 40,

  position: 'relative',
})

export const AddressHeader = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingRight: 50,
  marginBottom: 10,

  [`${Heading}`]: {
    fontSize: '$md',
    margin: 0,
  },

  [`${Text}`]: {
    display: 'flex',
    alignItems: 'center',
    gap: '$2',
  },
})

export const BtnShowActions = styled('button', {
  all: 'unset',
})

export const BtnAction = styled('button', {
  all: 'unset',

  cursor: 'pointer',

  display: 'flex',
  gap: '$2',
  alignItems: 'center',
})

export const Actions = styled('div', {
  display: 'flex',
  gap: '$4',

  position: 'absolute',
  top: 15,
  right: 10,

  fontSize: '$sm',
})

export const ActionsContent = styled('div', {
  display: 'none',
  padding: 18,

  position: 'absolute',
  top: 0,
  right: 35,
  width: 200,
  background: '$gray200',

  button: {
    textWrap: 'nowrap',
  },

  variants: {
    actived: {
      true: {
        display: 'flex',
        flexDirection: 'column',
        gap: '$2',
      },
    },
  },
})
