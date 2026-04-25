import {
  Heading,
  Text,
  keyframes,
  styled,
} from '@lemonade-technologies-hub-ui/react'
import { CircleFlash, TimeDiscountTag } from './TimeDiscount/styles'
import loading from '@/assets/loading.svg'

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
  '> div:nth-child(3)': {
    transform: 'translateX(0)',
    transitionDelay: '2.2s',
  },

  variants: {
    size: {
      sm: {
        display: 'flex',
        left: '$2',
        right: 'auto',
        gap: '$2',
      },
      xs: {
        display: 'flex',
        left: '$2',
        right: 'auto',
        gap: '$2',
      },
    },
  },
})
export const StarsWrapper = styled('div', {
  marginTop: '$2',
  marginBottom: '$4',

  '@media (max-width: 480px)': {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '$2',
  },
})

export const BtnStarComment = styled('button', {
  all: 'unset',
  display: 'flex',
  alignItems: 'center',
  gap: '$2',

  position: 'relative',
  cursor: 'pointer',

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

  backgroundImage: `url(${loading.src})`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',

  width: '100%',
  height: '100%',

  // variants: {
  //   hasImage: {
  //     true: {
  //       backgroundImage: 'none',
  //     },
  //   },
  // },
})

export const ProductFigure = styled('figure', {
  position: 'relative',
  overflow: 'hidden',

  width: '100%',
  height: '253px',
  margin: 0,

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  // img: {
  //   position: 'absolute',
  //   top: 0,
  //   backgroundColor: 'transparent',
  //   objectFit: 'cover',
  // },

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
})

export const TextCrop = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '38px',

  [`> ${Heading}`]: {
    marginBottom: '$2',
    lineHeight: '19px',
    textAlign: 'center',

    display: '-webkit-box',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',

    color: '$gray800',
    fontWeight: '$regular',
    fontSize: '$md',
  },

  variants: {
    orientation: {
      x: {
        justifyContent: 'flex-start',
        height: 'auto',

        [`> ${Heading}`]: {
          textAlign: 'left',
        },

        [`> ${Text}`]: {
          margin: 0,
        },

        '@media (max-width: 480px)': {
          justifyContent: 'center',
          [`> ${Heading}`]: {
            textAlign: 'center',
          },
        },
      },
      y: {},
    },

    mode: {
      gridlist: {
        [`> ${Heading}`]: {
          textAlign: 'left',
        },
      },
      grid: {},
      list: {
        [`> ${Heading}`]: {
          textAlign: 'left',

          '@media (max-width: 480px)': {
            textAlign: 'center',
          },
        },
      },
    },
  },

  '@media (max-width: 480px)': {
    [`> ${Heading}`]: {
      textAlign: 'center !important',
    },
  },
})

export const TextCropDescription = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',

  [`> ${Text}`]: {
    marginBottom: '$2',
    lineHeight: '19px',

    display: '-webkit-box',
    '-webkit-line-clamp': 6,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',

    color: '$gray800',
    fontWeight: '$regular',
  },

  variants: {
    orientation: {
      x: {
        justifyContent: 'flex-start',
        height: 'auto',

        [`> ${Text}`]: {
          margin: 0,
        },
      },
      y: {},
    },
  },
})

export const ProductDescriptions = styled('div', {
  width: '100%',
  padding: '$4',
  textAlign: 'center',

  a: {
    textDecoration: 'none',
  },

  variants: {
    size: {
      sm: {
        width: 'auto',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0,

        [`> ${Text}`]: {
          marginBottom: '0',
        },

        '> div': {
          maxWidth: '80%',
        },

        '@media (max-width: 480px)': {
          padding: '$2',
          textAlign: 'center',
          '> div': {
            maxWidth: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          },
        },
      },
      xs: {
        width: 'auto',
        height: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 0,
        paddingLeft: '28px',

        [`> ${Text}`]: {
          marginBottom: '0',
        },

        '@media (max-width: 480px)': {
          paddingLeft: '$4',
        },
      },
    },
  },
})

export const insideleft = keyframes({
  from: {
    transform: 'translateX(150px)',
  },
  to: {
    transform: 'translateX(0)',
  },
})

export const PriceWrapper = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '$6',

  marginTop: '$2',
  variants: {
    orientation: {
      x: {
        justifyContent: 'flex-start',
        gap: '$4',

        [`> ${Text}`]: {
          fontSize: '$xs',
        },

        '@media (max-width: 480px)': {
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '$1',
        },
      },
      y: {},
    },
  },

  '@media (max-width: 480px)': {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '$1',
  },
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

export const ProductBoxContainer = styled('div', {
  width: '100%',
  display: 'block',
  position: 'relative',
  background: '$white',

  boxSizing: 'border-box',
  borderRadius: '$md',
  border: '1px solid $gray200',

  overflow: 'hidden',

  [`&:hover ${ProductActions} > div`]: {
    transform: 'translateX(0)',
  },

  variants: {
    size: {
      sm: {
        display: 'grid',
        gridTemplateColumns: '188px auto',
        border: 0,
        borderRadius: 'unset',
      },
      xs: {
        display: 'grid',
        gridTemplateColumns: '80px auto',
        border: 0,
        borderRadius: 'unset',
      },
    },
    isPromotion: {
      true: {
        borderColor: '#e7dd00',
      },
    },
    orientation: {
      x: {
        marginBottom: '$4',
      },
      y: {},
    },
    mode: {
      gridlist: {
        display: 'flex',

        [`${ProductFigure}`]: {
          width: '200px',
          height: '200px',
        },

        [`${StarsWrapper}`]: {
          display: 'flex',
          justifyContent: 'flex-start',
        },

        [`${TextCrop}`]: {
          justifyContent: 'flex-start',
          height: 'auto',
        },

        [`${PriceWrapper}`]: {
          justifyContent: 'flex-start',
        },

        [`${TimeDiscountTag}`]: {
          width: '160px',
          height: 'auto',
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          padding: '4px 0',
          gap: '9px',

          marginLeft: 0,
          marginRight: 'unset',
        },

        [`${CircleFlash}`]: {
          marginRight: 'unset',
          marginLeft: '5px',
          marginBottom: 0,
          top: 0,
        },

        [`${ProductDescriptions}`]: {
          display: 'flex',
          alignItems: 'center',
        },
      },
      list: {
        display: 'flex',
        border: 0,
        borderRadius: 'unset',

        a: {
          p: {
            textAlign: 'left',
            marginBottom: '$4',
          },
        },

        paddingBottom: '$6',
        borderBottom: '1px solid $gray100',

        [`${ProductFigure}`]: {
          width: '200px',
          height: '200px',

          borderRadius: '$md',
        },

        [`${StarsWrapper}`]: {
          display: 'flex',
          justifyContent: 'flex-start',
        },

        [`${TextCrop}`]: {
          justifyContent: 'flex-start',
          height: 'auto',

          [`${Text}`]: {
            fontWeight: '$medium',
          },
        },

        [`${PriceWrapper}`]: {
          justifyContent: 'flex-start',
        },

        [`${TimeDiscountTag}`]: {
          width: '160px',
          height: 'auto',
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          padding: '4px 0',
          gap: '9px',

          marginLeft: 0,
          marginRight: 'unset',
        },

        [`${CircleFlash}`]: {
          marginRight: 'unset',
          marginLeft: '5px',
          marginBottom: 0,
          top: 0,
        },

        [`${ProductDescriptions}`]: {
          display: 'flex',
          alignItems: 'center',

          paddingRight: '$10',
        },

        [`${TextCropDescription}`]: {
          [`${Text}`]: {
            color: '$gray400',
            lineHeight: '22px',
          },
        },
      },
      grid: {},
    },
  },
})
