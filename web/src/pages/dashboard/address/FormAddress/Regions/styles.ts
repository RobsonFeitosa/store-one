import { styled } from '@lemonade-technologies-hub-ui/react'

export const RegionsContainer = styled('div', {
  display: 'flex',
  gap: 20,

  '> div': {
    width: '100%',

    '&:last-child': {
      marginBottom: 0,
    },
  },
})
