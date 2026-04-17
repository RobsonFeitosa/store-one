import {
  Button,
  Heading,
  Text,
  styled,
} from '@lemonade-technologies-hub-ui/react'

export const CheckoutServiceContainer = styled('div', {
  minWidth: 600,

  '@media(max-width: 800px)': {
    minWidth: 450,
  },

  '@media(max-width: 680px)': {
    minWidth: '100%',
  },
})

export const WrapperPayment = styled('div', {
  marginTop: '$6',
  marginBottom: '$8',

  [`${Heading}`]: {
    fontSize: '$md',
    marginBottom: '$2',
  },
})

export const CheckoutContent = styled('div', {
  background: '$white',
  padding: '$2 $4',

  marginTop: '$4',
  marginBottom: '$6',
})

export const BtnGoBack = styled('button', {
  all: 'unset',

  color: '$gray500',
  fontSize: '$xs',

  display: 'flex',
  alignItems: 'center',
  gap: '$2',

  background: '$gray200',
  padding: '0 8px',
  borderRadius: '$lg',
})

export const WrapperProfessionalCheck = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
})

export const TextTotal = styled(Text, {
  marginBottom: '$10',
  display: 'block',
})

export const DateScheduleText = styled(Text, {
  textAlign: 'center',
  display: 'block',
})

export const BtnFinish = styled(Button, {
  margin: '0 auto',
  marginTop: '$4',
  width: '300px',
})
