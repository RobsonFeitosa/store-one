import { Heading, Text, styled } from '@lemonade-technologies-hub-ui/react'

export const WrapperContent = styled('div', {
  position: 'absolute',
  left: '32%',
  top: '$40',

  [`${Heading}`]: {
    fontSize: '$4xl',
    color: '$gray800',
  },

  [`${Text}`]: {
    marginTop: '$4',
    background: '#FFE99D',
    width: 'auto',
    display: 'inline-block',
    padding: '4px 12px',
  },

  transition: 'all ease-in-out 0.2s',
  opacity: 0,

  variants: {
    isLeftAnimation: {
      true: {
        transform: 'translateX(-150px)',
      },
    },
    isTopAnimation: {
      true: {
        transform: 'translateY(-150px)',
      },
    },
  },

  '@media (max-width: 680px)': {
    top: '15%',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '90%',
    textAlign: 'center',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    [`${Heading}`]: {
      fontSize: '$lg',
    },

    [`${Text}`]: {
      fontSize: '$sm',
    },
  },
})

export const SlicerContent = styled('div', {
  position: 'relative',
  zIndex: 2,
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
})

export const SlideContainer = styled('div', {
  position: 'relative',
  width: '100%',
  height: '550px',
  background: '$gray100',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  marginBottom: '$4',

  '> div:first-child': {
    minHeight: '100%',
    width: '100%',

    '> div': {
      display: 'flex',
      justifyContent: 'center',
      minHeight: '100%',
      width: '100%',

      img: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'center',
      },

      '@media (max-width: 680px)': {
        img: {
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
        },
      },

      '@media (min-width: 1920px)': {
        div: {
          width: '100%',
        },
        img: {
          width: '100%',
          height: 'auto',
        },
      },
    },
  },

  '.actived': {
    [`${WrapperContent}`]: {
      transform: 'translateX(0)',
      transitionDelay: '0.2s',
      opacity: 1,

      '@media (max-width: 680px)': {
        transform: 'translateX(-50%)',
      },
    },
  },

  '@media (max-width: 680px)': {
    height: '300px',
  },
})

export const BtnBuyNow = styled('button', {
  marginTop: '$10',
  background: '#FF9900',
  color: '$white',
  border: 0,
  padding: '$2 $6',
  borderRadius: '25px',

  '@media (max-width: 680px)': {
    marginTop: '$4',
  },
})

export const ArrowsBox = styled('div', {})
