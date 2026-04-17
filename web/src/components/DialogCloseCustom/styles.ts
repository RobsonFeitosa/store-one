import { styled } from '@lemonade-technologies-hub-ui/react'

export const DialogCloseCustomContainer = styled('button', {
  all: 'unset',
  position: 'absolute',
  background: 'transparent',
  border: '0px',
  top: '1.5rem',
  right: '1.5rem',

  svg: {
    lineHeight: 0,
    cursor: 'pointer',
    color: '$gray500',
    padding: '0px',
  },
})
