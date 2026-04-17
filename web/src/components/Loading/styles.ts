import { keyframes, styled } from '@lemonade-technologies-hub-ui/react'

export const rotate = keyframes({
  from: {
    transform: 'rotate(0deg)',
  },
  to: {
    transform: 'rotate(360deg)',
  },
})

export const LoadingContainer = styled('div', {
  display: 'flex',
  margin: '0 $4',
  alignItems: 'center',

  svg: {
    marginLeft: '$4',
    animation: `${rotate} 2s linear infinite`,
  },
})
