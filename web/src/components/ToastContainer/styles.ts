import { styled } from '@lemonade-technologies-hub-ui/react'

export const Toast = styled('div', {
  position: 'fixed',
  right: 0,
  top: 0,
  padding: '30px',
  overflow: 'hidden',
  zIndex: 99999999,

  variants: {
    empty: {
      true: {
        zIndex: -1,
      },
    },
  },
})
