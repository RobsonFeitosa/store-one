import { styled } from '@lemonade-technologies-hub-ui/react'

export const AddressContainer = styled('div', {})

export const AddressContent = styled('div', {
  marginTop: '$2',
  width: '100%',
})

export const BtnPrimary = styled('button', {
  width: '100%',
  background: 'transparent',
  textAlign: 'left',

  padding: '$2 $4',
  border: '1px solid $gray600',

  position: 'relative',
  zIndex: 2,

  variants: {
    selected: {
      true: {
        background: '$gray100',
        borderColor: '$alosixG300',

        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
    },
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
