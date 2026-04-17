import { styled } from '@lemonade-technologies-hub-ui/react'

import { animated } from 'react-spring'

export const ToastSingleContainer = styled(animated.div, {
  width: '360px',

  position: 'relative',
  padding: '16px 30px 16px 16px',
  borderRadius: '10px',
  boxShadow: '2px 2px 8px rgba(0, 0, 0, 0.2)',

  display: 'flex',

  background: '#ebf8ff',
  color: '#3172b7',

  '& + div': {
    marginTop: '18px',
  },

  '> svg': {
    margin: '4px 12px 0 0',
  },

  '> div': {
    flex: 1,

    p: {
      marginTop: '4px',
      fontSize: '14px',
      opacity: 0.8,
      lineHeight: '20px',
    },
  },

  '> button': {
    position: 'absolute',
    right: '16px',
    top: '19px',
    opacity: 0.6,
    border: 0,
    background: 'transparent',
    color: 'inherit',
    cursor: 'pointer',
  },

  variants: {
    type: {
      info: {
        background: '#ebf8ff',
        color: '#3172b7',
      },
      success: {
        background: '#e6fffa',
        color: '#2e656a',
      },
      error: {
        background: '#fddede',
        color: '#c53030',
      },
    },
    hasDescription: {
      true: {
        alignItems: 'center',

        svg: {
          marginTop: 0,
        },
      },
    },
  },
})
