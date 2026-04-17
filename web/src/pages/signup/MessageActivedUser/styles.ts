import { styled } from '@lemonade-technologies-hub-ui/react'

export const MessageActivedUserContainer = styled('div', {
  padding: '$10',
  placeContent: 'center',
  margin: '0 auto',
  marginTop: '$10',
  width: '440px',
  height: '220px',
  border: '2px dashed $alosixG300',

  '@media (max-width: 520px)': {
    width: '100%',
  },
})

export const MessageContent = styled('div', {
  '> div': {
    display: 'flex',
    alignItems: 'center',
    gap: '$4',

    marginBottom: '$4',
  },
})
