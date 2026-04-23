import { Heading, Text, styled } from '@lemonade-technologies-hub-ui/react'

export const ProductDataContainer = styled('div', {
  [`> ${Heading}`]: {
    fontSize: '$lg',
    marginBottom: '$2',
  },
})

export const ProductDataContent = styled('div', {
  // display: 'flex',
})
export const WrapperSelectType = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$4',

  [`> ${Text}`]: {
    whiteSpace: 'nowrap',
  },

  '> div': {
    width: '100%',
  },

  marginTop: '$4',
  marginBottom: '$4',
})

export const AsideDataProduct = styled('div', {
  width: '$40',
})

export const ProductContentWrapper = styled('div', {})

