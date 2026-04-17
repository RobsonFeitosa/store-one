import { styled } from '@lemonade-technologies-hub-ui/react'

export const OrderModalContainer = styled('div', {
  maxHeight: 450,
  overflowY: 'auto',

  width: 800,
  paddingTop: 20,
})

export const ImagesWrapper = styled('div', {
  marginRight: 15,
  border: '1px solid $gray100',

  img: {
    width: 80,
    height: 'auto',
  },
})

export const OrderSingleHeader = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
})

export const BtnDownload = styled('button', {
  all: 'unset',

  cursor: 'pointer',

  display: 'flex',
  gap: '$2',

  background: '#ff9900',
  padding: '2px 8px',
  borderRadius: '$sm',
  fontSize: '$sm',
})

export const OrderProductContent = styled('div', {
  a: {
    textDecoration: 'none',
    color: '$gray800',
    fontSize: '$sm',

    '&:hover': {
      color: '#ff9900',
    },
  },
})

export const OrderProductWP = styled('div', {})

export const OrderProductWrapper = styled('div', {
  marginBottom: 20,
  padding: 20,
  borderRadius: '$sm',
  background: '$white',

  display: 'flex',
  alignItems: 'center',
})
