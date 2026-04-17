import { Heading, Text, styled } from '@lemonade-technologies-hub-ui/react'

export const HeaderContent = styled('div', {
  background: '$gray100',

  marginBottom: '$10',
})

export const BreadcrumbHeading = styled(Heading, {
  display: '-webkit-box',
  '-webkit-line-clamp': 1,
  '-webkit-box-orient': 'vertical',
  overflow: 'hidden',

  maxWidth: '570px',

  '@media (max-width: 768px)': {
    maxWidth: '100%',
  },
})

export const BreadcrumbContent = styled('div', {})

export const BreadcrumbText = styled(Text, {
  display: '-webkit-box',
  '-webkit-line-clamp': 1,
  '-webkit-box-orient': 'vertical',
  overflow: 'hidden',

  maxWidth: '270px',

  '@media (max-width: 768px)': {
    maxWidth: '100%',
  },
})

export const Breadcrumb = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$4',

  li: {
    listStyle: 'none',
  },
})

export const BodyContent = styled('div', {
  position: 'relative',
  zIndex: 1,
})

export const HeaderContentWrapper = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  height: '$16',

  [`${Heading}`]: {
    fontSize: '$lg',
  },

  '@media (max-width: 768px)': {
    padding: '$4',
    flexDirection: 'column',
    gap: '$4',
    height: 'auto',
  },
})

export const Loading = styled('div', {
  width: '100%',
  '> div': {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
})
