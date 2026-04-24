import { BtnWish } from '@/components/ProductBox/WishProduct/styles'
import {
  Button,
  Heading,
  Text,
  styled,
} from '@lemonade-technologies-hub-ui/react'

export const ProductContainer = styled('div', {
  paddingTop: '$2',
})

export const DisplayImagesProduct = styled('div', {
  position: 'relative',
})

export const DiscountOff = styled('div', {
  position: 'absolute',
  right: 15,
  top: 15,
  zIndex: 3,

  background: '#e7dd00',
  width: '60px',
  height: '60px',
  borderRadius: '$full',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  textAlign: 'center',

  [`> ${Text}`]: {
    lineHeight: '17.5px',
    marginTop: '2px',
  },

  span: {
    display: 'block',
  },
})

export const SummaryProduct = styled('div', {
  [`> ${Heading}`]: {
    marginBottom: '$4',
  },
})

export const Breadcrumb = styled('div', {
  display: 'flex',
  gap: '$4',

  li: {
    listStyle: 'none',
  },

  marginBottom: '$4',
})

export const BtnVariation = styled('button', {
  all: 'unset',

  marginRight: '$4',

  border: '2px solid #ff9900',
  padding: '2px 15px',
  borderRadius: '$xs',

  fontSize: '$sm',

  variants: {
    actived: {
      true: {
        background: '#ff9900',
      },
    },
  },
})

export const OldPriceText = styled(Text, {
  textDecoration: 'line-through',
})

export const VariationPriceWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$4',

  marginTop: 15,
})

export const VariantionWrapper = styled('div', {
  marginBottom: '$6',
})

export const AttributeWrapper = styled('div', {
  [`${Heading}`]: {
    fontSize: '$md',
    marginBottom: '4px',
  },
})

export const WrapperHeader = styled('header', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '$4',

  marginBottom: '$4',

  [`${Text}`]: {
    textWrap: 'nowrap',
    fontSize: '$xs',
    color: '$gray400',
  },
})

export const DataWrapper = styled('div', {
  display: 'flex',
  gap: '$4',
  marginBottom: '$6',

  [`${Text}`]: {
    fontSize: '$xs',
    color: '$gray400',
    background: '$gray100',
    padding: '2px 8px',
    borderRadius: '$xs',
  },
})

export const QueryFrete = styled('div', {
  marginTop: '$4',

  '> div': {
    marginTop: '$2',
  },
})

export const PriceWrapper = styled('div', {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: '$8',
  margin: '20px 0',
})

export const Price = styled(Text, {
  fontWeight: '$bold',

  variants: {
    isPromotion: {
      true: {
        svg: {
          color: '#e7dd00',
          marginRight: '$2',
        },
      },
    },
  },
})

export const OldPrice = styled(Text, {
  textDecoration: 'line-through',
})

export const Description = styled(Text, {
  margin: '$4 0',

  marginBottom: '$8',

  color: '$gray500',
})

export const BtnsCart = styled('div', {
  display: 'flex',
  gap: '$4',

  '@media (max-width: 1200px)': {
    marginTop: '$4',
  },
})

export const AddToCartWrapper = styled('div', {
  display: 'flex',
  gap: '$8',

  '@media (max-width: 1200px)': {
    display: 'block',
  },
})

export const BtnAddToCart = styled(Button, {
  width: '180px',

  display: 'flex',
  gap: '$2',
})

export const WishContent = styled('div', {
  margin: '$4 0',
  display: 'flex',
  alignItems: 'center',
  gap: '$2',

  [`${BtnWish} > div`]: {
    border: 0,
    width: 'auto',
  },

  '> div': {
    transform: 'translateX(0)',
  },
})

export const ProductsRelatedWrapper = styled('div', {
  marginTop: '$16',
  marginBottom: '$12',

  [`${Heading}`]: {
    marginBottom: '$6',
    fontSize: '$lg',
  },
})

export const ProductContent = styled('div', {
  display: 'grid',
  gridTemplateColumns: '450px auto',

  gridGap: '$8',

  '@media (max-width: 990px)': {
    display: 'block',
  },
})

export const CategoriesWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$2',
})

export const DisplayImage = styled('div', {
  width: '100%',
})

export const DescriptionWrapper = styled('div', {
  width: '100%',

  marginTop: '$10',
})
