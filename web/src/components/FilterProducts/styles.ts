import { Button, styled } from '@lemonade-technologies-hub-ui/react'

export const FilterProductsContainer = styled('div', {})

export const Form = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$6',

  marginTop: '$4',

  hr: {
    margin: '$1',
  },

  '> button': {
    minWidth: '80px',
  },
})

export const PriceWrapperBox = styled('div', {})

export const PriceWeight = styled('div', {
  display: 'flex',
  gap: '$4',
  '> div': {
    width: '100%',
  },
})

export const BtnsWrapper = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  gap: '$4',

  width: '100%',
})

export const BtnButtonClean = styled(Button, {
  gap: '$2',
  textTransform: 'uppercase',
  background: '$alosixY500',
})

export const BtnButton = styled(Button, {
  gap: '$2',
  textTransform: 'uppercase',

  width: '100%',
})

export const PriceWrapper = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
})
