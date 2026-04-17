import { styled } from '@lemonade-technologies-hub-ui/react'

export const CallSingleContainer = styled('div', {
  marginBottom: '$12',

  // '@media (max-width: 1200px)': {
  //   marginBottom: '$4',
  // },
})

export const CallItem = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$4',

  'strong, span': {
    display: 'block',
    lineHeight: '18px',
  },
})

export const Hr = styled('hr', {
  width: '100%',
  height: '1px',
  background: '$gray300',
  marginTop: '$10',
  opacity: 1,
  borderTop: 0,

  '@media (max-width: 600px)': {
    marginTop: '$4',
  },
})

export const CallsingleContent = styled('div', {
  display: 'grid',
  gridTemplateColumns: '22% 22% 28% 28%',

  svg: {
    color: '$gray800',
  },

  '> div': {
    padding: '22px 30px',
    borderLeft: '1px solid $gray200',

    '&:first-child': {
      border: 0,
    },
  },

  '@media (max-width: 990px)': {
    gridTemplateColumns: '50% 50%',

    '> div': {
      marginBottom: '$8',
    },

    '> div:nth-child(3)': {
      border: 0,
      marginBottom: 0,
    },

    '> div:nth-child(4)': {
      marginBottom: 0,
    },
  },

  '@media (max-width: 700px)': {
    display: 'block',

    '> div': {
      marginBottom: '$2',
      border: 0,
      padding: '8px',
    },

    '> div:nth-child(3)': {
      marginBottom: '$2',
    },

    '> div:nth-child(4)': {
      marginBottom: '$2',
    },
  },
})
