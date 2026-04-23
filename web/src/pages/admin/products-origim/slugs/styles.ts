import {
  Button,
  Heading,
  Text,
  styled,
} from '@lemonade-technologies-hub-ui/react'
import Link from 'next/link'

export const ProductContainer = styled('div', {
  display: 'flex',
  gap: '$8',
})

export const WrapperShortDescription = styled('div', {
  marginBottom: '$4',

  [`${Heading}`]: {
    fontSize: '$lg',
    marginBottom: '$2',
    marginTop: '0',
  },

  '.ql-container.ql-snow': {
    height: '150px',
  },

  '.ql-snow *': {
    color: '$gray800',
  },
})

export const ProductWrapper = styled('div', {
  width: '100%',

  '> div': {
    marginBottom: '$4',
  },

  '.ql-container.ql-snow': {
    height: '350px',

    ul: {
      paddingLeft: '1rem',
    },

    'li, ul': {
      color: '$gray800',
    },
  },
})

export const WrapperBtns = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',

  gap: '$4',
})

export const HeaderGoToProductView = styled('div', {
  display: 'flex',
  gap: '$2',
  flexDirection: 'column',

  '> div': {
    width: '100%',
  },
})

export const BtnSaveDraft = styled(Button, {
  width: '100%',
  background: '$gray400',
})

export const BtnRestore = styled(Button, {})

export const BtnGoTrash = styled(Button, {
  width: '100%',

  background: '$gray400',
  display: 'flex',
  gap: '$2',
})

export const BtnAddCategory = styled('button', {})

export const TimeDiscount = styled('div', {
  border: '1px solid #9f0404',
  padding: '$2 $4',

  [`${Heading}`]: {
    fontSize: '$sm',
  },

  hr: {
    borderColor: '$gray400',
    margin: '$2 0',
  },

  [`${Button}`]: {
    width: '100%',
    marginTop: '$2',
  },
})

export const SideWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  width: '25rem',
  gap: '$8',
})

export const WrappersText = styled('div', {
  marginTop: '$2',
  marginBottom: '$2',

  display: 'flex',
  flexDirection: 'column',
  gap: '$2',
})

export const PublisherWrapper = styled('div', {
  background: '$gray150',
  padding: '$4',

  display: 'flex',
  flexDirection: 'column',
  gap: '$2',
})

export const CategoriesWrapper = styled('div', {})

export const ViewersWrapper = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  gap: '$10',

  '> div': {
    display: 'flex',
    alignItems: 'center',
    gap: '$4',
  },
})

export const CropText = styled('div', {
  display: 'block',
  maxWidth: '800px',

  [`> ${Text}`]: {
    color: '$gray300',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },

  '@media (max-width: 1780px)': {
    maxWidth: '600px',
  },

  '@media (max-width: 1540px)': {
    maxWidth: '500px',
  },

  '@media (max-width: 1410px)': {
    maxWidth: '350px',
  },
})

export const BtnCopy = styled('button', {
  all: 'unset',

  background: '$gray100',
  borderRadius: '$xs',
  padding: '2px 6px',

  display: 'flex',
  alignItems: 'center',
  gap: '5px',

  color: '$gray400',
  fontSize: '$sm',

  transition: 'all ease-in-out 0.1s',

  [`> ${Text}`]: {
    textWrap: 'nowrap',
  },

  '&:hover': {
    background: '$gray300',
    color: '$white',
  },
})

export const ViewLink = styled(Link, {
  display: 'flex',
  gap: '$2',
  justifyContent: 'space-between',
  alignItems: 'center',

  textDecoration: 'none',

  background: '$gray100',
  borderRadius: '$xs',
  padding: '2px 6px',

  fontSize: '$sm',

  transition: 'all ease-in-out 0.1s',

  [`> ${Text}`]: {
    color: '$gray400',
  },

  svg: {
    color: '$gray400',
  },

  '&:hover': {
    background: '$gray300',
    color: '$white',

    [`> ${Text}`]: {
      color: '$white',
    },

    svg: {
      color: '$white',
    },
  },
})

export const TagsWrapper = styled('div', {})

export const ImageWrapper = styled('div', {
  background: '$gray100',
})

export const Form = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  color: '$alosixY500',
  gap: '$6',

  hr: {
    margin: '$1',
  },

  p: {
    color: '$gray500',
  },
})

