import { Heading, styled } from '@lemonade-technologies-hub-ui/react'

export const BrandHeader = styled('div', {
  position: 'relative',
})

export const BrandsContainer = styled('div', {
  position: 'relative',
  marginTop: '100px',

  [`${Heading}`]: {
    marginBottom: '$8',
  },
})

export const ArrowsBox = styled('div', {
  '> div:first-child': {
    button: {
      left: 'auto',
      right: '80px',
    },
  },
  '> div:last-child': {
    button: {
      right: 0,
      left: 'auto',
    },
  },
  button: {
    top: '-15px',
    marginTop: '$2',
  },

  '@media (max-width: 680px)': {
    button: {
      top: '-26%',
    },

    '> div:first-child': {
      button: {
        left: 'auto',
        right: '76px',
      },
    },
    '> div:last-child': {
      button: {
        right: '15px',
      },
    },
  },
})
