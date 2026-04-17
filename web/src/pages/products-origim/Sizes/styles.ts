import { Text, styled } from '@lemonade-technologies-hub-ui/react'

export const SizesContainer = styled('div', {
  padding: '0 $2',

  ul: {
    margin: 0,
    padding: 0,

    li: {
      listStyle: 'none',
      padding: '$2 0',

      '&:last-child': {
        paddingBottom: 0,
      },
    },
  },
})

export const LabelCheckbox = styled('div', {
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
    cursor: 'pointer',

    '> div': {
      width: '18px',
      height: '18px',
      border: '1px solid $gray',
      borderRadius: '$full',
    },
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
