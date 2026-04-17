import { Text, keyframes, styled } from '@lemonade-technologies-hub-ui/react'

export const TimeDiscountContainer = styled('div', {})

export const insideleft = keyframes({
  from: {
    transform: 'translateX(150px)',
  },
  to: {
    transform: 'translateX(0)',
  },
})

export const TimeDiscountTag = styled('div', {
  background: '$gray800',

  animation: `${insideleft} 0.4s linear none`,

  position: 'relative',

  height: '160px',
  width: '$10',
  margin: '0 auto',
  borderRadius: '25px',

  marginTop: '14px',
  marginBottom: '-16px',

  [`> ${Text}`]: {
    position: 'relative',
    zIndex: 2,
    top: '2px',
    color: '$white',
    fontWeight: '$regular',
    lineHeight: '1.625rem',
    textAlign: 'center',
  },

  variants: {
    size: {
      sm: {
        background: '$black',

        width: '148px',
        margin: '0 auto',
        height: 'auto',

        padding: '8px 10px',

        marginTop: '60px',

        borderRadius: '25px 25px 0 0',
      },
      xs: {
        background: '$black',

        width: '148px',
        margin: '0 auto',
        height: 'auto',

        padding: '8px 10px',

        marginTop: '60px',

        borderRadius: '25px 25px 0 0',
      },
    },
    isLineX: {
      true: {
        marginTop: 0,
        marginLeft: 30,
        borderRadius: 25,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        paddingLeft: 10,

        '> div': {
          left: '-4px',
          top: '-3px',
        },

        [`> ${Text}`]: {
          top: 0,
        },
      },
    },
  },
})

export const CircleFlash = styled('div', {
  background: '$black',
  borderRadius: '100%',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  width: '$8',
  height: '$8',

  margin: '0 auto',
  marginBottom: '$2',

  position: 'relative',
  top: '0.3125rem',

  svg: {
    position: 'relative',
    top: '-2px',
    color: '#E7DD00',
  },

  variants: {
    size: {
      sm: {
        width: '48px',
        height: '48px',

        position: 'absolute',
        left: '50%',
        top: '-27px',
        zIndex: 0,
        transform: 'translateX(-50%)',
      },
      xs: {
        width: '48px',
        height: '48px',

        position: 'absolute',
        left: '50%',
        top: '-27px',
        zIndex: 0,
        transform: 'translateX(-50%)',
      },
    },
  },
})
