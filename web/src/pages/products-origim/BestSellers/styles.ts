import { Heading, styled } from '@lemonade-technologies-hub-ui/react'

export const BestSellersContainer = styled('div', {
  border: '1px solid $gray100',
  padding: '$1',
  borderRadius: '$md',
})

export const HeaderWrapper = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  background: '$gray100',
  padding: '11px',
  borderRadius: '$sm',

  [`${Heading}`]: {
    fontSize: '$sm',
  },

  marginBottom: '$4',
})

export const ProductContentBox = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',
})

export const BestSellerContent = styled('div', {
  marginBottom: '0',
  padding: '0 $2',
})

export const Loading = styled('div', {
  '> div': {
    display: 'block',
    width: '100%',
    overflow: 'hidden',
    marginBottom: '$4',
  },
})

export const ArrowsBox = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  gap: '$2',

  '> div:first-child': {
    button: {
      left: '-6%',
    },
  },
  '> div:last-child': {
    button: {
      right: '-6%',
    },
  },

  '@media (max-width: 680px)': {
    display: 'flex',
    position: 'absolute',
    top: '45%',
    transform: 'translateX(-50%)',
    left: '50%',
    zIndex: 10,
    gap: '$4',

    button: {
      position: 'relative',
      left: 'auto',
      right: 'auto',
    },
  },
})
