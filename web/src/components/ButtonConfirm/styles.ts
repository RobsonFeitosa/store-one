import { styled } from '@lemonade-technologies-hub-ui/react'

export const ButtonConfirmContainer = styled('button', {})

export const Confirmed = styled('div', {
  color: 'green',
  borderColor: 'green',
  border: '1px solid green',
  padding: '1px 6px',
  borderRadius: '2px',
  marginLeft: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  opacity: 0.6,
  transition: 'all ease-in-out 0.2s',
  whiteSpace: 'nowrap',

  '&:hover': {
    opacity: 0.9,
  },
})
