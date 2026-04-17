import { Heading, styled } from '@lemonade-technologies-hub-ui/react'

export const DashboardContent = styled('div', {})

export const LoadingWrapper = styled('div', {
  '> span': {
    marginBottom: 15,
    display: 'block',
  },
})

export const AsideBar = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',
})

export const OrderWrapper = styled('div', {
  background: '$gray100',
  padding: 20,
  borderRadius: '$sm',
})

export const CompleteRegisterWrapper = styled('div', {})

export const AddingAddress = styled('div', {
  marginTop: 40,
  borderRadius: '$sm',

  padding: 30,
  background: '$gray100',

  display: 'flex',
  justifyContent: 'space-between',

  [`${Heading}`]: {
    fontSize: '$md',
    marginBottom: '$2',
  },

  svg: {
    color: '#ff9900',
  },
})

export const CompleteRegister = styled('div', {
  marginTop: 30,
  borderRadius: '$sm',
  display: 'flex',

  [`${Heading}`]: {
    fontSize: '$md',
    marginBottom: '$2',
  },

  padding: 30,
  background: '$gray100',
})

export const IconWp = styled('div', {
  svg: {
    color: '#ff9900',
  },
})

export const LastOrder = styled('div', {
  width: '100%',
  marginTop: '$6',

  [`${Heading}`]: {
    fontSize: '$md',
    marginBottom: '$2',
  },
})
