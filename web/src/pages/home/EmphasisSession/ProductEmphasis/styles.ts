import { Text, styled } from '@lemonade-technologies-hub-ui/react'

export const ProductActions = styled('div', {
  position: 'absolute',
  zIndex: 1,
  right: '$2',
  top: '$2',

  '> div:first-child': {
    marginBottom: '10px',
  },
  '> div:nth-child(2)': {
    marginBottom: '10px',
    transitionDelay: '0.2s',
  },

  // '> div': {
  //   transform: 'translateX(130px)',
  //   transition: 'all ease-in-out 0.4s',
  // },
})
export const ProductEmphasisContainer = styled('div', {
  width: '100%',

  display: 'grid',
  gridTemplateColumns: '65%  35%',

  position: 'relative',
  background: '$white',

  boxSizing: 'border-box',
  borderRadius: '$md',
  border: '1px solid $gray200',

  overflow: 'hidden',

  [`&:hover ${ProductActions} > div`]: {
    transform: 'translateX(0)',
  },

  '@media (max-width: 990px)': {
    marginBottom: '$6',
    gridTemplateColumns: '55%  45%',
  },

  '@media (max-width: 600px)': {
    display: 'flex',
    flexDirection: 'column',
    gap: '$4',
  },
})

export const StarsWrapper = styled('div', {
  marginTop: '$2',
  marginBottom: '$6',
})

export const BtnStarComment = styled('button', {
  all: 'unset',

  position: 'relative',
  zIndex: 10,

  svg: {
    color: '#FFBF34',
  },
})

export const EmptyIcon = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  left: 0,
  top: 0,
  height: '100%',
  width: '100%',
  background: '$gray100',

  svg: {
    color: '$gray200',
  },
})
export const ProductFigureContent = styled('div', {
  background: '$white',
  display: 'block',

  width: '100%',
  height: '100%',
})

export const ProductFigure = styled('figure', {
  position: 'relative',
  overflow: 'hidden',

  width: '100%',
  height: '493px',
  margin: 0,

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  variants: {
    size: {
      sm: {
        width: '188px',
        border: '1px solid $gray200',
        borderRadius: '$md',
      },
      xs: {
        width: '90px',
        height: '100px',
        border: '1px solid $gray200',
        borderRadius: '$md',
      },
    },
  },

  '@media (max-width: 600px)': {
    height: '350px',
  },
})

export const TextCrop = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '68px',
  marginBottom: '$8',

  [`> ${Text}`]: {
    fontSize: '$md',
    marginBottom: '$2',
    lineHeight: '24px',

    display: '-webkit-box',
    '-webkit-line-clamp': 3,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',

    color: '$gray800',
    fontWeight: '$regular',
  },
})

export const ProductDescriptions = styled('div', {
  padding: '$4',
  textAlign: 'center',
  paddingTop: '128px',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  a: {
    textDecoration: 'none',
  },

  '@media (max-width: 600px)': {
    paddingTop: '38px',
  },

  variants: {
    isPromotion: {
      false: {
        paddingTop: 0,
      },
    },
  },
})

export const Dots = styled('div', {
  display: 'flex',
  padding: '10px 11px',
  borderRadius: '$lg',
  justifyContent: 'center',
  background: '#f2f2f2',

  position: 'absolute',
  bottom: '10px',
  left: '50%',
  transform: 'translateX(-50%)',

  '.dot': {
    border: 'none',
    width: '10px',
    height: '10px',
    background: '#c5c5c5',
    borderRadius: '50%',
    margin: '0 5px',
    padding: '5px',
    cursor: 'pointer',
  },

  '.dot:focus': {
    outline: 'none',
  },

  '.dot.active': {
    background: '#000',
  },
})

export const TimeDiscountTag = styled('div', {
  background: '$black',
  padding: '18px 10px',

  position: 'relative',

  borderRadius: '30px 30px 0 0 ',

  width: '248px',
  margin: '0 auto',

  marginTop: '119px',
  marginBottom: '-16px',

  [`> ${Text}`]: {
    position: 'relative',
    zIndex: 2,
    top: '2px',
    color: '$white',
    fontWeight: 'bold',
  },

  '@media (max-width: 600px)': {
    paddingTop: '38px',
    width: '158px',
    padding: '10px 10px',
    marginTop: '59px',

    [`> ${Text}`]: {
      fontSize: '$xs',
    },
  },
})

export const CircleFlash = styled('div', {
  background: '$black',
  borderRadius: '100%',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  width: '88px',
  height: '88px',

  position: 'absolute',
  left: '50%',
  top: '-54px',
  zIndex: 1,
  transform: 'translateX(-50%)',

  svg: {
    position: 'relative',
    top: '-2px',
    color: '#E7DD00',
  },

  '@media (max-width: 600px)': {
    width: '48px',
    height: '48px',
    top: '-24px',

    svg: {
      width: '22px',
    },
  },
})

export const PriceWrapper = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '$6',

  marginTop: '$2',
})

export const Price = styled(Text, {
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
