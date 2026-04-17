import { Heading, styled } from '@lemonade-technologies-hub-ui/react'

export const AvaliationContainer = styled('div', {
  width: '500px',
})

export const AvaliationBox = styled('div', {
  [`${Heading}`]: {
    marginTop: '$4',
    marginBottom: '$4',
    fontSize: '$lg',
    fontWeight: '$bold',
  },
})

export const StarsWrapper = styled('div', {
  marginTop: '$2',

  svg: {
    color: '#FFBF34',
  },
})

export const Util = styled('div', {
  marginTop: '$4',
})

export const BtnUtil = styled('button', {
  all: 'unset',

  background: '$gray200',
  padding: '4px 8px',
  fontSize: '$xs',
  color: '$black',

  borderRadius: '$xs',

  display: 'flex',
  alignItems: 'center',
  gap: '3px',
  transition: 'all ease-in-out 0.1s',

  '&:hover': {
    background: '#ff9900',
    color: '$white',
  },
})
