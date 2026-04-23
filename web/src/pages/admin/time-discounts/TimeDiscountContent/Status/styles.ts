import { Text, styled } from '@lemonade-technologies-hub-ui/react'

export const StatusContainer = styled('div', {
  display: 'flex',
  gap: '$2',
  alignItems: 'center',

  border: '1px solid $gray200',
  padding: '0 $2',
  borderRadius: '$lg',

  '> div': {
    width: '$2',
    height: '$2',
    background: '$black',
    borderRadius: '100%',
  },

  [`${Text}`]: {
    fontSize: '$xs',
    lineHeight: 'normal',
  },

  variants: {
    status: {
      actived: {
        '> div': {
          background: '#ff6601',
          borderColor: '#ff6601',
        },
      },
      cancel: {
        '> div': {
          background: '#b90000',
          borderColor: '#b90000',
        },
      },
      complete: {
        '> div': {
          background: '$alosixG200',
          borderColor: '$alosixG200',
        },
      },
      idle: {
        '> div': {
          background: '#ecbd52',
          borderColor: '#ecbd52',
        },
      },
    },
  },
})
