import { styled } from '@lemonade-technologies-hub-ui/react'

export const EmphasisSessionContainer = styled('div', {})

export const Descriptions = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center',
})

export const ImagaWrapper = styled('div', {
  display: 'flex',
  justifyContent: 'center',

  '@media (max-width: 1200px)': {
    padding: '$4',

    img: {
      width: '100%',
      height: 'auto',
    },
  },
})
export const BoxWrapper = styled('div', {
  background: '$gray100',
  borderRadius: '$md',
  minHeight: '235px',
  marginBottom: '25px',

  padding: '$4 0',

  display: 'flex',
  flexDirection: 'column',
  gap: '$4',
  paddingBottom: 0,
})

export const Loading = styled('div', {
  display: 'flex',
  gap: '$8',

  '> div': {
    display: 'block',
    width: '100%',
    overflow: 'hidden',
  },
})
