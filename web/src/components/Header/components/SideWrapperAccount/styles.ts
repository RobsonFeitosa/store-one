import { Text, styled } from '@lemonade-technologies-hub-ui/react'
import Link from 'next/link'

export const SideWrapperAccountContainer = styled('div', {
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  gap: '$8',

  position: 'relative',

  a: {
    color: '$gray800',
    textDecoration: 'none',
  },

  '@media (max-width: 980px)': {
    marginTop: '$2',
    marginBottom: '$6',
    justifyContent: 'center',
  },
})

export const TextLabel = styled(Text, {
  background: '#f00a0a',
  width: '16px',
  height: '16px',

  borderRadius: '$full',
  fontSize: '10px !important',
  lineHeight: 'normal',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '$white',

  position: 'absolute',
  top: '-4px',
  left: '11px',
})

export const BtnCart = styled('button', {
  all: 'unset',

  display: 'flex',
  gap: '$2',
  alignItems: 'center',
})

export const Cart = styled('div', {
  display: 'flex',
  gap: '$2',

  position: 'relative',

  [`${Text}`]: {
    fontSize: '$ms',
  },

  svg: {
    color: '$gray800',
  },
})

export const LinkMyAccount = styled(Link, {
  '> div': {
    [`${Text}:last-child`]: {
      fontSize: '$xs',
    },
  },
})

export const MyAccount = styled('div', {
  a: {
    display: 'flex',
    alignItems: 'center',
    gap: '$2',

    [`${Text}`]: {
      fontSize: '$ms',
      display: 'block',
      lineHeight: 'normal',
    },
  },
})
