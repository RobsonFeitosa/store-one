import { Heading, Text, styled } from '@lemonade-technologies-hub-ui/react'

export const ProductVariationsContainer = styled('div', {})

export const ProductVariationHeader = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$4',

  marginTop: '$4',
  marginBottom: '$4',

  [`${Heading}`]: {
    fontSize: '$lg',
    margin: 0,
  },
})

export const BtnAttributes = styled('button', {
  all: 'unset',

  '&:disabled': {
    svg: {
      color: '$gray200',
    },
  },
})

export const VariationsContent = styled('div', {
  marginTop: '$6',
  marginBottom: '$4',
  padding: '$4',
  background: '$gray100',

  [`> ${Heading}`]: {
    marginBottom: '$4',
    fontSize: '$lg',
  },
})

export const ProductVariationContent = styled('div', {
  position: 'relative',
  marginTop: '0',
  marginBottom: '$4',

  display: 'flex',
  flexDirection: 'column',
  gap: '$4',

  [`${Heading}`]: {
    fontSize: '$md',
    marginBottom: '$4',
  },
})

export const Form = styled('div', {
  display: 'flex',
  color: '$alosixY500',
  flexDirection: 'column',
  gap: '$4',

  marginTop: '$4',

  hr: {
    margin: '$1',
  },
})

export const ProductVariationSingle = styled('div', {
  display: 'flex',
  gap: '$6',
})

export const BtnRemoveAttribute = styled('button', {
  all: 'unset',
  width: '35px',
  background: '$gray100',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  borderRadius: '$xs',
})

export const VariationsList = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',
})

export const VariationsWrapper = styled('div', {
  [`> ${Text}`]: {
    marginTop: '$6',
    marginBottom: '$2',
    display: 'block',

    '&:first-child': {
      marginTop: 0,
    },
  },
})

