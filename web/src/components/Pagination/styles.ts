import { styled } from '@lemonade-technologies-hub-ui/react'

export const PaginationContainer = styled('div', {
  ul: {
    display: 'flex',
    gap: '$2',
    margin: 0,
    padding: 0,

    li: {
      listStyle: 'none',
    },
  },
})

export const Li = styled('li', {
  variants: {
    selected: {
      true: {
        button: {
          background: '$alosixG300',
          border: 0,
          color: '$white',
        },
      },
    },
  },
})

export const BtnPagination = styled('button', {
  background: 'transparent',
  width: '$8',
  borderRadius: '4px',
  height: '$8',
  overflow: 'hidden',
  border: '1px solid $gray200',

  fontSize: '$sm',
  color: '$gray400',
})
