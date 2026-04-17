import { Heading, Text, styled } from '@lemonade-technologies-hub-ui/react'

export const ProductsContainer = styled('div', {
  marginBottom: '$20',
})

export const HeaderProducts = styled('div', {})

export const ProductWrapper = styled('div', {
  display: 'block',
  marginBottom: '$6',
})

// export const LabelWrapper = styled('div', {
//   display: 'flex',
//   gap: '$2',
// })

export const BtnClean = styled('div', {
  all: 'unset',

  cursor: 'pointer',
})

export const FilterHeader = styled('div', {
  background: '$gray100',
  padding: '11px',
  fontSize: '$sm',
  borderRadius: '$sm',
  height: '46px',

  marginBottom: '$4',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
})

export const FilterWrapper = styled('div', {
  [`${Heading}`]: {
    fontSize: '$sm',
  },

  '> div': {
    border: '1px solid $gray100',
    padding: '$1',
    borderRadius: '$md',

    marginBottom: '$6',
    paddingBottom: '$4',
  },
})

export const Price = styled('div', {})

export const PriceContent = styled('div', {
  padding: '0 $2',
})

export const PriceWrapper = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
})

export const ColorsWrapper = styled('div', {})

export const BannerWrapper = styled('div', {
  borderRadius: '$md',
  overflow: 'hidden',
  img: {
    width: '100%',
    height: 'auto',
  },
})

export const CategoriesContent = styled('div', {
  padding: '0 $2',

  ul: {
    padding: 0,
    margin: 0,

    maxHeight: '200px',
    overflowY: 'scroll',

    li: {
      listStyle: 'none',

      a: {
        textDecoration: 'none',

        span: {
          transition: 'all ease-in-out 0.1s',
          color: '$gray800',
        },

        '&:hover': {
          span: {
            color: '#ff9900',
          },
        },
      },
    },
  },
})

export const CategoryLi = styled('li', {
  button: {
    all: 'unset',

    cursor: 'pointer',
  },

  variants: {
    actived: {
      true: {
        [`${Text}`]: {
          color: '#ff9900',
        },
      },
    },
  },
})

export const Loading = styled('div', {
  display: 'flex',
  gap: '$6',

  '> div': {
    display: 'flex',
    flexDirection: 'column',
    gap: '$6',
    width: '100%',
    overflow: 'hidden',
  },

  variants: {
    isList: {
      false: {
        '@media (max-width: 998px)': {
          '> div:nth-child(-n+1)': {
            display: 'none',
          },
        },

        '@media (max-width: 768px)': {
          '> div:nth-child(-n+2)': {
            display: 'none',
          },
        },

        '@media (max-width: 600px)': {
          '> div:nth-child(-n+3)': {
            display: 'none',
          },
        },
      },
    },
  },
})

export const HeaderWrapper = styled('div', {
  position: 'relative',
  zIndex: 3,

  [`${Heading}`]: {
    fontSize: '$lg',
    marginBottom: '$2',
  },

  '@media (max-width: 998px)': {
    marginTop: '$10',
  },
})

export const Categories = styled('div', {})

export const SizeContent = styled('div', {})

export const Size = styled('div', {})

export const BestSellerWrapper = styled('div', {
  marginBottom: '$6',
})

export const Form = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  color: '$alosixY500',
  gap: '$4',

  hr: {
    margin: '$1',
  },

  '> button': {
    minWidth: '80px',
  },
})
