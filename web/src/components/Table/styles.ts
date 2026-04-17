import { styled } from '@lemonade-technologies-hub-ui/react'

export const TableContainer = styled('div', {})

export const TableItem = styled('div', {})

export const TableHeaders = styled('div', {
  fontWeight: '$bold',
  background: '$gray100',
  borderRadius: '$xs',

  display: 'grid',
  alignItems: 'center',

  gridTemplateColumns: '$$columnNumber',

  '> span': {
    borderLeft: '1px solid $gray100',

    padding: '$2 $4',
    paddingLeft: '$6',
  },
})

export const TableContent = styled('div', {
  '> div': {
    display: 'grid',
    alignItems: 'center',
    gridTemplateColumns: '$$columnNumber',
    borderBottom: '1px solid $gray100',

    '> *': {
      display: 'flex',

      '&::before': {
        content: '',
        display: 'flex',
        width: '1px',
        height: '20px',
        background: '$gray100',
        marginRight: '$6',
      },

      '&:first-child': {
        paddingLeft: '$6',

        '&::before': {
          display: 'none',
        },
      },

      padding: '$2 $4',
      paddingLeft: 0,
    },
  },
})
