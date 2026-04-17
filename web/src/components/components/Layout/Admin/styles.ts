import { Text, styled } from '@lemonade-technologies-hub-ui/react'
import Link from 'next/link'
import { CaretDoubleLeft } from 'phosphor-react'

export const AdminContainer = styled('div', {})

export const BrandAdminHeader = styled('div', {})

export const AdminHeader = styled('div', {
  background: '$gray100',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '$2',

  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 9999,

  width: '100%',
})

export const HeaderRight = styled('div', {
  display: 'flex',
  gap: '$20',

  '> a': {
    color: '$gray500',
    textDecoration: 'none',
    fontSize: '$sm',
    transition: 'all ease-in-out 0.1s',

    '&:hover': {
      color: '$alosixG200',
    },
  },
})

export const NewProductLink = styled(Link, {
  color: '$gray800',
  textDecoration: 'none',
  display: 'flex',
  gap: '$2',
  alignItems: 'center',
  marginRight: '$4',
})

export const AdminWrapper = styled('div', {
  height: '100vh',

  display: 'flex',
  alignItems: 'stretch',
})

export const StyledCaretDoubleLeft = styled(CaretDoubleLeft, {
  width: '20px',
  transition: 'transform 300ms cubic-bezier(0.87, 0, 0.13, 1)',
  '&': { transform: 'rotate(0)' },

  color: '$white',
  opacity: '0.7',

  '&:hover': {
    svg: {
      opacity: 1,
    },
  },

  variants: {
    isMinimize: {
      true: {
        transform: 'rotate(180deg)',
      },
    },
  },
})

export const BtnSignOut = styled('button', {
  all: 'unset',

  color: '$white',
  marginBottom: '$2',
  marginLeft: '$2',

  display: 'flex',
  gap: '$2',
  alignItems: 'center',
})

export const AccountWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$4',
  justifyContent: 'flex-start',
  width: '100%',
  padding: '$2',

  [`${Text}`]: {
    color: '$white',
    textWrap: 'nowrap',
  },
})

export const MinimizeBox = styled('div', {
  display: 'flex',
  justifyContent: 'flex-end',
  borderTop: '1px solid #93c67b',
  width: '100%',
})

export const BtnMinimize = styled('button', {
  all: 'unset',

  height: '55px',
  width: '70px',
  borderLeft: '1px solid #93c67b',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  transition: 'all ease-in-out 0.2s',
})

export const AdminContent = styled('div', {
  background: '$white',
  width: '100%',

  padding: '$4 $8',
  overflowY: 'scroll',
  paddingTop: '$20',
})

export const AdminAside = styled('div', {
  paddingTop: '$20',
  width: '320px',
  background: '$alosixG200',

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  transition: 'width ease-in-out 0.2s',

  variants: {
    isMinimize: {
      true: {
        width: '50px',

        [` ${BtnSignOut}`]: {
          marginLeft: '$4',
          marginBottom: '$4',
        },

        [` ${MinimizeBox}`]: {
          flexDirection: 'column',
        },

        [` ${BtnMinimize}`]: {
          width: '50px',
          borderLeft: 0,
        },

        [`${AccountWrapper}`]: {
          padding: 0,
          justifyContent: 'center',
          marginTop: '$2',

          [`${Text}`]: {
            display: 'none',
          },
        },
      },
    },
  },
})
