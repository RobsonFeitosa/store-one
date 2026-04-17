import { styled } from '@lemonade-technologies-hub-ui/react'

export const ProductCarouselContent = styled('div', {
  position: 'relative',
})

export const ProductsCarouselContainer = styled('div', {
  margin: '$20 0 ',

  '@media (max-width: 680px)': {
    margin: '$10 0 ',
  },
})

export const Loading = styled('div', {
  display: 'flex',
  gap: '$8',

  '> div': {
    display: 'block',
    width: '100%',
    overflow: 'hidden',
  },

  '@media (max-width: 1300px)': {
    '> div:nth-child(-n+1)': {
      display: 'none',
    },
  },

  '@media (max-width: 1000px)': {
    '> div:nth-child(-n+2)': {
      display: 'none',
    },
  },

  '@media (max-width: 600px)': {
    '> div:nth-child(-n+3)': {
      display: 'none',
    },
  },
})

export const ArrowsBox = styled('div', {
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

export const ViewAll = styled('div', {
  width: '100%',
  height: '100%',
  background: '#ff9900',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '$md',

  a: {
    textDecoration: 'none',
    color: '$white',
    fontWeight: '$bold',
  },
})
