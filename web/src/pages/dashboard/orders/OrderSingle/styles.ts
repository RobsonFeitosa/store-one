import { styled } from '@lemonade-technologies-hub-ui/react'

export const OrdersSingleContainer = styled('div', {
  background: '$gray100',
  padding: 20,

  borderRadius: '$sm',
  position: 'relative',
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
