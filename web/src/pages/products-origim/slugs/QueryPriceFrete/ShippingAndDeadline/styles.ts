import { styled } from '@lemonade-technologies-hub-ui/react'

export const ShippingAndDeadlineContainer = styled('div', {
  width: '25rem',

  '> div': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '$2',
    paddingBottom: '$2',

    borderBottom: '1px solid $gray300',

    '&:last-child': {
      border: 0,
      marginBottom: '$2',
      paddingBottom: '$2',
    },
  },
})

export const Description = styled('div', {
  '> div ': {
    'p:last-child': {
      fontSize: '$xs',
    },
  },
})
