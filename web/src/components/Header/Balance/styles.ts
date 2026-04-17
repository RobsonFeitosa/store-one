import {
  Button,
  Heading,
  styled,
  Text,
} from '@lemonade-technologies-hub-ui/react'

export const BalanceContainer = styled('div', {
  position: 'absolute',
  right: 0,
  top: '100%',
  width: '380px',
  background: '$gray100',
  zIndex: 99,

  paddingBottom: '$4',

  marginTop: '7px',

  '> div': {
    padding: '14px 20px',
  },

  [`${Text}`]: {
    color: 'rgb(94, 96, 40)',
  },

  hr: {
    border: 0,
    borderTop: '1px solid rgba(0,0,0,.4)',
  },
})

export const HeaderBalance = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  [`${Heading}`]: {
    color: '#5e6028',
    marginBottom: '2px',
    fontSize: '18px',

    display: 'flex',
    alignItems: 'center',

    '@media (max-width: 480px)': {
      fontSize: '15px',
    },

    svg: {
      marginLeft: '10px',
    },
  },

  [`> ${Text}`]: {
    display: 'block',
    fontSize: '13px',
    textTransform: 'uppercase',
    lineHeight: 'normal',
  },
})

export const ContentBalance = styled('div', {
  maxHeight: 400,

  overflowY: 'auto',
})

export const ProductSingle = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  borderBottom: '1px solid $gray200',
  paddingBottom: '$4',

  '> div': {
    display: 'flex',
    alignItems: 'center',
    gap: '$6',
  },

  padding: '$4 0',

  '&:first-child': {
    paddingTop: 0,
  },

  '&:last-child': {
    border: 0,
    paddingBottom: 0,
    // padding: 0,
  },
})

export const BtnRemoveOrder = styled('button', {
  all: 'unset',

  svg: {
    color: '$gray600',
  },
})

export const DescriptionWrapper = styled('div', {
  width: '100%',

  [`${Heading}`]: {
    fontSize: '$sm',
    marginBottom: '3px',
    width: '90%',
  },

  '> div': {
    display: 'flex',
    alignItems: 'center',
    gap: '$4',
  },
})

export const FinishOrder = styled('div', {
  borderTop: '1px solid $gray200',
  marginTop: '$4',
  paddingTop: '$4',

  display: 'flex',
  justifyContent: 'space-between',
})

export const BtnFinish = styled(Button, {
  background: '$gray300',

  '&:hover': {
    background: '#ff9900',
  },
})

export const BtnClean = styled('button', {
  all: 'unset',
  color: '$gray500',
  fontSize: '$sm',

  svg: {
    color: '$gray500',
  },
})
