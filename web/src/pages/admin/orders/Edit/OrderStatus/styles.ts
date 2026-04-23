import { styled } from '@lemonade-technologies-hub-ui/react'

export const OrderStatusContainer = styled('div', {})

export const OrderStatusList = styled('div', {
  border: '1px solid $gray300',
  padding: '$2',
  marginTop: '$4',
})

export const OrderStatusListContent = styled('div', {
  maxHeight: '150px',
  overflowY: 'scroll',
})

export const OrderStatusContent = styled('div', {
  borderBottom: '1px solid $gray300',
  background: '$alosixY300',
  padding: '$2',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  '&:last-child': {
    border: 0,
  },
})
