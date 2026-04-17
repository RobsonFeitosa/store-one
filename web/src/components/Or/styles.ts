import { Text, styled } from '@lemonade-technologies-hub-ui/react'

export const OrContent = styled(Text, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '1.25rem',
  marginBottom: '1.25rem',
  color: '$gray300',

  '&::before': {
    content: '',
    width: '3.125rem',
    height: '0.0625rem',
    background: '#c9c9c9',
    display: 'flex',
    alignItems: 'center',
    marginRight: '0.625rem',
  },

  '&::after': {
    content: '',
    width: '3.125rem',
    height: '0.0625rem',
    background: '#c9c9c9',
    display: 'flex',
    alignItems: 'center',
    marginLeft: '0.625rem',
  },
})
