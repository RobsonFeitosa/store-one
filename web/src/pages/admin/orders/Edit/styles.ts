import { Text, styled } from '@lemonade-technologies-hub-ui/react'

export const EditContainer = styled('div', {})

export const OrderEditContent = styled('div', {})

export const OrderProductSummaryContent = styled('div', {
  maxHeight: '200px',
  overflowY: 'scroll',
})

export const OrderProductSummary = styled('div', {})

export const TextAddress = styled(Text, {
  maxWidth: '60%',
})

export const ProductContent = styled('div', {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: '$8',

  marginBottom: '$4',

  '&:last-child': {
    marginBottom: 0,
  },
})

export const TotalsWrapper = styled('div', {
  textAlign: 'right',

  [`${Text}`]: {
    marginBottom: '2px',
    display: 'block',
  },
})

export const TextTotal = styled(Text, {
  marginTop: '$4',
})

export const SummaryProduct = styled('div', {
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',

  [`> div:first-child`]: {
    display: 'flex',
    gap: '$4',
    width: '80%',

    [`${Text}:last-child`]: {
      width: '330px',
      marginRight: '20px',
    },
  },
})
