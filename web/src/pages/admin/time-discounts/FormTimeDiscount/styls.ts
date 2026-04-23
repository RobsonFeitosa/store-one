import { TextInput, styled } from '@lemonade-technologies-hub-ui/react'

export const FormTimeDiscountContainer = styled('div', {
  position: 'relative',
})

export const WrapperDate = styled('div', {
  width: '100%',

  '> div > div:first-child': {
    position: 'absolute',
    zIndex: 2,
    width: 'auto',
    opacity: 0,
  },

  [`${TextInput}`]: {
    width: '100%',
    position: 'relative',
    zIndex: 1,
  },
  '.react-datepicker__triangle': {
    transform: 'translate(43px, 0px)',
  },
})

export const DatePickerWrapper = styled('div', {
  position: 'relative',
  zIndex: 2,
  width: '100%',
  opacity: 0,
})

export const Form = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  color: '$alosixY500',
  gap: '$4',

  marginTop: '$4',

  hr: {
    margin: '$1',
  },

  '> button': {
    minWidth: '80px',
  },
})
