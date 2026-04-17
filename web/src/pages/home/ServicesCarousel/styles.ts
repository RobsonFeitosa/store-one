import {
  Button,
  Heading,
  Text,
  styled,
} from '@lemonade-technologies-hub-ui/react'

export const ServicesCarouselContainer = styled('div', {
  display: 'grid',
  gridTemplateColumns: '60% 30%',
  gridGap: '$10',

  margin: '$16 0',

  '@media (max-width: 700px)': {
    display: 'block',
    marginBottom: '$4',
  },
})

export const CarouselContent = styled('div', {
  background: '$gray100',
  padding: '$20 $10',
  display: 'block',

  borderRadius: '0 $md $md 0',

  '@media (max-width: 700px)': {
    borderRadius: 0,
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

  '@media (max-width: 900px)': {
    '> div:nth-child(-n+2)': {
      display: 'none',
    },
  },
})

export const ServiceContent = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '30.825rem',

  position: 'relative',

  [`${Text}`]: {
    fontSize: '$lg',
    lineHeight: '2rem',
    fontWeight: '$regular',
    marginBottom: '$6',
  },

  [`${Heading}`]: {
    marginBottom: '$8',
    fontSize: '1.375rem',
    fontWeight: '$medium',

    '&::after': {
      content: '',
      width: '20.625rem',
      height: '0.0625rem',
      background: '#F4F4F4',
      display: 'block',

      position: 'relative',
      zIndex: -1,

      marginTop: '$6',
      marginLeft: '-110px',
    },
  },

  '@media (max-width: 1500px)': {
    width: '100%',

    [`${Text}`]: {
      fontSize: '$sm',
      lineHeight: '1.8rem',
      marginBottom: '$4',
    },
  },

  '@media (max-width: 700px)': {
    marginTop: '$2',
    padding: '$10',
  },
})

export const ArrowsBox = styled('div', {
  '> div:first-child': {
    button: {
      left: 0,
    },
  },
  '> div:last-child': {
    button: {
      right: 0,
    },
  },
  button: {
    top: 0,
    marginTop: '$2',
  },
  '@media (max-width: 680px)': {
    display: 'flex',
    position: 'absolute',
    top: '-80px',
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

export const BtnViewMore = styled(Button, {
  marginTop: '$8',
  background: '#FF9900',
})
