// import { rotate } from '../Loading/styles'

import { styled } from '@lemonade-technologies-hub-ui/react'

export const PixModalContainer = styled('div', {
  width: '100%',
  display: 'block',
})

export const BtnCancelPix = styled('button', {
  position: 'absolute',
  top: '38px',
  right: '32px',

  outline: 'none',
  fontSize: '$xs',
  border: '0.0625rem solid rgb(187, 187, 187)',
  color: 'rgb(100, 100, 100)',
  background: 'rgb(217, 217, 217)',
  padding: '0.0938rem 0.375rem',
})

export const DisplayCode = styled('div', {
  marginTop: '$4',
  padding: '$4',

  width: '100%',
  background: '$alosixY100',

  display: 'flex',
  justifyContent: 'center',
})

export const WrapperCopy = styled('div', {
  display: 'flex',
  gap: '$4',
  marginBottom: '$4',
  marginTop: '$4',
})

export const Crop = styled('div', {
  width: '344px',
  overflow: 'hidden',
  padding: '0.875rem 1.25rem',
  background: 'rgb(233, 233, 233)',
  whiteSpace: 'nowrap',
  border: '0.0625rem solid $alosixG300',
  [`> ${Text}`]: {},
})

export const BtnCopy = styled('button', {
  background: '$alosixG300',
  height: '56px',
  borderRadius: '0',
  border: '0px',
  padding: '0px 16px',

  color: '$white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '$2',
})

export const WaitPayment = styled('div', {
  marginTop: '$8',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '$4',

  svg: {
    // animation: `${rotate} 2s linear infinite`,
  },
})
