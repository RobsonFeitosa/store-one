import { Heading, Text, styled } from '@lemonade-technologies-hub-ui/react'

export const CommentsContainer = styled('div', {})

export const CommentsHeader = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$4',
})

export const CommentsWrappers = styled('div', {
  '> div > div:nth-last-child(-n+3) > div': {
    marginBottom: 0,
  },
})

export const CommentsBox = styled('div', {
  background: '$gray100',
  borderRadius: '$md',

  padding: '$4',

  [`${Heading}`]: {
    marginTop: '$4',
    marginBottom: '$4',
    fontSize: '$lg',
    fontWeight: '$bold',
  },

  marginTop: '$2',
  marginBottom: '$4',
})

export const StarsWrapper = styled('div', {
  marginTop: '$2',

  svg: {
    color: '#FFBF34',
  },
})

export const Util = styled('div', {
  marginTop: '$4',
})

export const BtnUtil = styled('button', {
  all: 'unset',

  background: '$gray200',
  padding: '4px 8px',
  fontSize: '$xs',
  color: '$black',

  borderRadius: '$xs',

  display: 'flex',
  alignItems: 'center',
  gap: '3px',
  transition: 'all ease-in-out 0.1s',

  '&:hover': {
    background: '#ff9900',
    color: '$white',
  },
})

export const BtnStarComment = styled('button', {
  all: 'unset',

  position: 'relative',
  zIndex: 10,

  svg: {
    color: '#FFBF34',
  },
})

export const ShowMore = styled('div', {})

export const BtnMore = styled('button', {
  all: 'unset',
  color: '#ff9900',
  fontSize: '$xs',
  fontWeight: '$bold',
})

export const CropText = styled('div', {
  height: '57px',
  display: 'flex',
  alignItems: 'center',

  [`> ${Text}`]: {
    marginBottom: '$2',
    lineHeight: '19px',

    display: '-webkit-box',
    '-webkit-line-clamp': 3,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',

    color: '$gray800',
    fontWeight: '$regular',
  },
})
