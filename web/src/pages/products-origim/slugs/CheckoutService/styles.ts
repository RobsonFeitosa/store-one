import {
  Button,
  Heading,
  Text,
  styled,
} from '@lemonade-technologies-hub-ui/react'

export const CheckoutServiceContainer = styled('div', {
  width: '100%',
  padding: '$8',
  display: 'flex',
  flexDirection: 'column',
  gap: '$6',

  [`> ${Heading}`]: {
    fontSize: '$2xl',
    marginBottom: '$4',
  },
})

export const CheckoutContent = styled('div', {
  background: '$white',
  padding: '$4',
  borderRadius: '$md',
  border: '1px solid $gray200',
  display: 'flex',
  flexDirection: 'column',
  gap: '$2',
  position: 'relative',
})

export const WrapperProfessionalCheck = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
})

export const BtnGoBack = styled('button', {
  all: 'unset',
  color: '$gray600',
  fontSize: '$xs',
  display: 'flex',
  alignItems: 'center',
  gap: '$2',
  background: '$gray100',
  padding: '$1 $3',
  borderRadius: '$full',
  cursor: 'pointer',
  transition: 'background 0.2s',

  '&:hover': {
    background: '$gray200',
  },
})

export const DateScheduleText = styled(Text, {
  textAlign: 'center',
  fontSize: '$lg',
  color: '$gray700',
  margin: '$4 0',
})

export const WrapperPayment = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',

  [`${Heading}`]: {
    fontSize: '$md',
    color: '$gray800',
  },
})

export const TextTotal = styled(Text, {
  fontSize: '$xl',
  color: '$gray900',
  marginTop: '$4',
})

export const BtnFinish = styled(Button, {
  width: '100%',
  maxWidth: '320px',
  margin: '$4 auto 0',
  height: '48px',
})

export const SuccessContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  gap: '$4',
  padding: '$10 0',

  svg: {
    color: '$green500',
    marginBottom: '$4',
  },
})

export const SuccessTitle = styled(Heading, {
  fontSize: '$2xl',
  color: '$green600',
})
