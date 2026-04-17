import { styled } from '@lemonade-technologies-hub-ui/react'

export const CouponWinContainer = styled('div', {
  background: '#FF9900',
  padding: 20,

  borderRadius: '$sm',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '$4',
})

export const Crop = styled('div', {})

export const CopyCoupon = styled('div', {
  display: 'flex',
  gap: '$4',
})

export const BtnCopy = styled('button', {
  background: '$alosixG300',
  borderRadius: '$xs',
  border: '0px',
  padding: '4px 8px',
  fontSize: '$sm',

  color: '$white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '$2',
})
