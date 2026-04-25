import { styled } from '@lemonade-technologies-hub-ui/react'
import Link from 'next/link'

export const Container = styled('div', {
  width: '100%',
  display: 'none',
  background: '$gray100',

  '@media (max-width: 700px)': {
    display: 'none',
  },

  boxShadow: 'rgba(0, 0, 0, 0.086) 1px 1px 2px',

  variants: {
    float: {
      true: {
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 123,
        display: 'block',
      },
    },
  },
})

export const CategoriesWrapper = styled('div', {
  width: '60px',

  '@media (max-width: 700px)': {
    width: '45px',
  },
})

export const RowFloat = styled('div', {
  display: 'grid',
  gridTemplateColumns: '14% 6% auto 20.9%',
  alignItems: 'center',

  padding: '$2',

  '@media (max-width: 1400px)': {
    gridTemplateColumns: 'auto 6% auto auto',
    gap: '$4',
  },

  '@media (max-width: 700px)': {
    gridTemplateColumns: 'auto 1fr',
    gap: '$2',
    padding: '$2 10px',

    '> :first-child, > :last-child': {
      display: 'none',
    },
  },
  '@media (max-width: 980px)': {
    '> div:nth-child(3)': {
      margin: '0 $4',

      ' form > div:nth-child(2)': {
        p: {
          display: 'none',
        },
      },
    },
    '> div:last-child ': {
      gap: '$4',
      margin: 0,
      p: {
        display: 'none',
      },
    },
  },
})

export const LinkBrand = styled(Link, {
  img: {
    height: '100%',
    width: 'auto',
  },

  '@media (max-width: 1400px)': {},

  '@media (max-width: 560px)': {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '$4',
  },

  '@media (max-width: 980px)': {
    img: {
      width: '120px',
    },
  },
})
