import { Text, styled } from '@lemonade-technologies-hub-ui/react'

export const ColorsContainer = styled('div', {
  padding: '0 $2',

  ul: {
    margin: 0,
    padding: 0,

    li: {
      listStyle: 'none',
      marginBottom: '$4',

      '&:last-child': {
        marginBottom: 0,
      },
    },
  },
})

export const LabelCheckbox = styled('label', {
  display: 'flex',
  alignItems: 'center',
  gap: '$2',
  marginBottom: '$2',

  button: {
    all: 'unset',
    color: '$gray800',

    display: 'flex',
    alignItems: 'center',
    gap: '$2',

    '> div': {
      width: '18px',
      height: '18px',
      border: '1px solid $gray',
      borderRadius: '$full',
    },

    cursor: 'pointer',
  },

  p: {
    lineHeight: 'normal',
  },

  variants: {
    actived: {
      true: {
        [`${Text}`]: {
          color: '#ff9900',
        },
      },
    },
  },
})
