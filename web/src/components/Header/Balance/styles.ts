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

  '@media (max-width: 480px)': {
    width: 'calc(100vw - 32px)',
    right: 'auto',
    left: '50%',
    transform: 'translateX(-50%)',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
    borderRadius: '$md',
    zIndex: 999,
  },

  '> div': {
    padding: '14px 20px',

    '@media (max-width: 480px)': {
      padding: '16px 12px',
    },
  },

  [`${Text}`]: {
    color: 'rgb(94, 96, 40)',
  },

  hr: {
    border: 0,
    borderTop: '1px solid rgba(0,0,0,.4)',
    margin: '10px 0',
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
    fontWeight: '$bold',
    textTransform: 'uppercase',
    lineHeight: 'normal',

    '@media (max-width: 480px)': {
      fontSize: '12px',
    },
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
    gap: '$4',

    '@media (max-width: 480px)': {
      gap: '$3',
    },

    img: {
      borderRadius: '$sm',
      objectFit: 'cover',
    },
  },

  padding: '$4 0',

  '&:first-child': {
    paddingTop: 0,
  },

  '&:last-child': {
    border: 0,
    paddingBottom: 0,
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
    width: '100%',
    lineHeight: '$shorter',

    '@media (max-width: 480px)': {
      fontSize: '13px',
    },
  },

  '> div': {
    display: 'flex',
    alignItems: 'center',
    gap: '$2',

    [`${Text}`]: {
      fontSize: '$sm',

      '@media (max-width: 480px)': {
        fontSize: '$xs',
      },
    },
  },
})

export const FinishOrder = styled('div', {
  borderTop: '1px solid $gray200',
  marginTop: '$4',
  paddingTop: '$4',

  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  '@media (max-width: 480px)': {
    gap: '$2',
  },
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
