import { styled, Text } from '@lemonade-technologies-hub-ui/react'
import Link from 'next/link'

export const LinkAdmin = styled(Link, {})

export const LinkWish = styled(Link, {
  display: 'flex',
  alignItems: 'center',
  gap: '$2',
  color: '$gray800',
  textDecoration: 'none',
  fontSize: '$sm',
})

export const HeaderContainer = styled('div', {
  padding: '$8 0',
})

export const WrapperWhats = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '$2',
  height: '100%',
  background: '$gray100',
  borderRadius: '$md',

  svg: {
    color: '$gray800',
  },

  '> div': {
    paddingRight: '3px',

    span: {
      display: 'block',
      lineHeight: '18px',
      fontSize: '$xs',

      '&:last-child': {
        fontSize: '18px',
        fontWeight: '$bold',
      },
    },
  },

  '@media (max-width: 980px)': {
    '> div': {
      span: {
        fontSize: '$xs',

        '&:last-child': {
          fontSize: '$sm',
        },
      },
    },
  },
})

export const HeadGray = styled('div', {
  textAlign: 'right',
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  gap: '$10',

  '@media (max-width: 680px)': {
    justifyContent: 'center',
    textAlign: 'center',
    gap: '$4',
  },

  a: {
    display: 'flex',
    alignItems: 'center',
    gap: '$2',
    color: '$gray800',
    textDecoration: 'none',
    fontSize: '$sm',
  },
})

export const RowGray = styled('div', {
  width: '100%',
  background: '$gray100',
  padding: '$2 0',
})

export const Container = styled('div', {
  // padding: '$4 0',
})

export const AuthWrapper = styled('div', {
  '> a': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '$6',

    borderRadius: '$full',
    textDecoration: 'none',

    [`> ${Text}`]: {
      color: '$alosixG300',
    },

    minWidth: '12rem',
    paddingLeft: '$4',

    '&:hover': {
      background: 'rgba(238, 249, 233, 0.91)',
    },
  },

  [`> ${Text}`]: {
    color: '$alosix700',
  },

  '@media (max-width: 768px)': {
    gap: '$2',

    [`${Text}`]: {
      fontSize: '$xs',
    },
  },
})

export const Brand = styled('div', {
  '@media (max-width: 560px)': {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '$4',
  },

  '@media (max-width: 768px)': {
    img: {
      width: '160px',
    },
  },

  '@media (max-width: 980px)': {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '$4',
  },
})

export const RowTwo = styled('div', {
  marginTop: '$6',
  width: '100%',
  position: 'relative',
  zIndex: 99,

  '> div': {
    display: 'flex',
    width: '100%',
  },

  display: 'grid',
  gridTemplateColumns: '20% 60.6% 17%',

  '@media (max-width: 1400px)': {
    gridTemplateColumns: '20% auto 20%',
  },

  '@media (max-width: 1200px)': {
    gridTemplateColumns: '24% auto 24%',
  },

  '@media (max-width: 980px)': {
    gridTemplateColumns: 'auto auto 26%',
  },

  '@media (max-width: 680px)': {
    display: 'block',
    zIndex: 'auto',

    '> div:nth-child(3), > div:nth-child(1)': {
      display: 'none',
    },
  },

  gridGap: '$4',
})

export const Menu = styled('div', {
  display: 'flex',
  height: '100%',

  ul: {
    margin: 0,
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '$8',
    width: '100%',

    li: {
      listStyle: 'none',

      a: {
        color: '$gray800',
        textDecoration: 'none',
      },
    },

    '@media (max-width: 600px)': {
      gap: '$6',
      display: 'block',
      textAlign: 'center',

      li: {
        display: 'inline-block',
        margin: '5px 20px',
      },
    },
  },

  '@media (max-width: 980px)': {
    width: '100%',
    marginBottom: '$4',
  },
})

export const IconEmpty = styled('div', {
  background: 'rgba(92, 157, 61, 0.22)',
  borderRadius: '100%',
  width: '65px',
  height: '65px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  padding: '3px',

  svg: {
    color: '$alosixG300',
  },

  '@media (max-width: 768px)': {
    width: '50px',
    height: '50px',

    svg: {
      width: '22px',
    },
  },

  '@media (max-width: 480px)': {
    width: '35px',
    height: '35px',

    svg: {
      width: '16px',
    },
  },
})
