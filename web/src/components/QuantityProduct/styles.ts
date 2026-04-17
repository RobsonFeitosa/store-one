import { styled } from '@lemonade-technologies-hub-ui/react'

export const QuantityContainer = styled('div', {
  display: 'flex',

  '> div': {
    width: '$16',
  },

  input: {
    textAlign: 'center',
  },

  '> button:first-child': {
    borderRight: 0,
  },

  '> button:last-child': {
    borderLeft: 0,
  },

  'input::-webkit-outer-spin-button, input::-webkit-inner-spin-button': {
    '-webkit-appearance': 'none',
    margin: 0,
  },

  'input[type=number]': {
    '-moz-appearance': 'textfield',
  },

  variants: {
    size: {
      sm: {
        button: {
          width: '$6',
        },

        '> div': {
          height: '$6',
          width: '$12',

          input: {
            fontSize: '$xs',
          },
        },
      },
    },
  },
})

export const BtnDecreaseIncrease = styled('button', {
  all: 'unset',

  color: '$gray800',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '$8',

  background: '$white',
  border: '1px solid $gray200',
})
