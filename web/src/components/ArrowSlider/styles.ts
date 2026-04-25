import { styled } from '@lemonade-technologies-hub-ui/react'

export const ArrowSliderContainer = styled('div', {})

export const BtnArrow = styled('button', {
  width: '50px',
  height: '50px',

  borderRadius: '$full',
  border: 0,
  outline: 'none',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  background: 'rgba(255, 255, 255, 0.82)',
  color: '$gray200',

  boxShadow: 'rgba(0, 0, 0, 0.086) 1px 1px 2px',

  position: 'absolute',
  left: '6%',
  top: '48%',
  marginTop: '-25px',
  zIndex: 1,

  variants: {
    isRight: {
      true: {
        right: '6%',
        left: 'auto',
      },
    },
  },
})
