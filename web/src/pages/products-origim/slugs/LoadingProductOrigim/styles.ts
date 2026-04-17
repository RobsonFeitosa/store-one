import { styled } from '@lemonade-technologies-hub-ui/react'

export const LoadingProductOrigimContainer = styled('div', {})

export const LoadingHeader = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',

  marginBottom: '$4',

  '@media (max-width: 550px)': {
    '> span:nth-child(1)  > span': {
      width: '200px !important',
    },

    '> span:nth-child(2)  > span': {
      width: '100px !important',
    },
  },
})

export const LoadingBtns = styled('div', {
  display: 'flex',
  justifyContent: 'flex-start',
  gap: '$4',

  marginBottom: '$8',
  marginTop: '$8',

  '@media (max-width: 550px)': {
    '> span:nth-child(2)  > span': {
      width: '100px !important',
    },

    '> span:nth-child(3)  > span': {
      width: '100px !important',
    },
  },
})

export const LoadingFrete = styled('div', {
  marginTop: '$4',
})

export const LoadingTumbs = styled('div', {
  marginTop: '$2',

  display: 'grid',
  gridTemplateColumns: '23.6% 23.6% 23.6% 23.6%',

  gridGap: '$2',
})

export const Loading = styled('div', {
  display: 'grid',
  gridTemplateColumns: '450px auto',

  gridGap: '$8',

  '@media (max-width: 990px)': {
    display: 'block',

    '> div:first-child': {
      marginBottom: '$10',
    },
  },

  '> div': {
    display: 'block',
    width: '100%',
    overflow: 'hidden',
  },
})
