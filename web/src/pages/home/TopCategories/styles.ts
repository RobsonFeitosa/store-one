import { Button, Heading, styled } from '@lemonade-technologies-hub-ui/react'

export const TopCategoriesContent = styled('div', {
  '> div': {
    marginBottom: '$12',
  },

  position: 'relative',

  '.mySwiper .swiper-pagination': {
    top: 100,
  },
})

export const TopCategoriesHeader = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  position: 'relative',
  marginBottom: '$10',

  '> div': {
    display: 'flex',
    alignItems: 'center',
    gap: '$10',
  },

  [`${Heading}`]: {
    textWrap: 'nowrap',
  },

  '@media (max-width: 600px)': {
    [`${Heading}`]: {
      marginBottom: '$4',
    },

    marginBottom: '$4',
    '> div': {
      display: 'block',
    },
  },
})
export const ProductContentBox = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridGap: '$6',

  '@media (max-width: 1200px)': {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },

  '@media (max-width: 990px)': {
    gridTemplateColumns: 'repeat(1, 1fr)',
  },
})

export const Loading = styled('div', {
  display: 'flex',
  gap: '$8',

  '> div': {
    display: 'flex',
    flexDirection: 'column',
    gap: '$8',
    width: '100%',
    overflow: 'hidden',
  },

  '@media (max-width: 1200px)': {
    '> div:nth-child(-n+1)': {
      display: 'none',
    },
  },

  '@media (max-width: 990px)': {
    '> div:nth-child(-n+2)': {
      display: 'none',
    },
  },
})

export const Hr = styled('hr', {
  border: '1px solid $gray500',
  height: '1px',
  width: '60px',
  borderTop: 0,

  '@media (max-width: 600px)': {
    display: 'none',
  },
})

export const TopCategoriesContainer = styled('div', {
  margin: '$16 0',
  position: 'relative',

  '@media (max-width: 900px)': {
    margin: '$10 0',
  },
})

export const CategoriesLabels = styled('div', {
  display: 'block',
  gap: '$4',

  '> div': {
    display: 'inline-block',
    verticalAlign: 'middle',
    marginRight: '4px',
    marginBottom: '2px',
  },
})

export const BtnCategory = styled(Button, {
  borderRadius: '$sm',
  padding: '3px 6px',

  fontSize: '$sm',
  display: 'inline-block',
})
