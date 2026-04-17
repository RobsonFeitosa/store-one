import { Heading, styled } from '@lemonade-technologies-hub-ui/react'

export const BestSellersContainer = styled('div', {
  margin: '6.875rem 0',

  '@media (max-width: 700px)': {
    margin: '2rem 0',
    marginBottom: '$16',
  },
})

export const BestSellersContent = styled('div', {
  position: 'relative',

  [`${Heading}`]: {
    marginBottom: '$8',
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
  button: {
    marginTop: '$2',
  },

  '@media (max-width: 680px)': {
    display: 'flex',
    position: 'absolute',
    top: '210px',
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
