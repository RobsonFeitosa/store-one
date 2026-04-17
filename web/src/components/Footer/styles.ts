import { Heading, Text, styled } from '@lemonade-technologies-hub-ui/react'
import Link from 'next/link'

export const FooterContainer = styled('div', {
  background: '$white',
})

export const FooterContent = styled('div', {
  display: 'grid',
  gridTemplateColumns: '30% 20% 20% 30%',

  '@media (max-width: 800px)': {
    gridTemplateColumns: '50% 50%',
    '> div': {
      marginBottom: '$10',
    },
  },
  '@media (max-width: 600px)': {
    gridTemplateColumns: '100%',
    '> div': {
      marginBottom: '$8',
    },
  },
})

export const About = styled('div', {
  paddingRight: '$20',

  [`> ${Text}`]: {
    color: '$gray800',
  },

  img: {
    marginBottom: '$4',
    margin: '0 auto',
  },

  a: {
    marginLeft: '$2',
    textDecoration: 'none',
    color: '$gray600',
  },

  '@media (max-width: 600px)': {
    paddingRight: '0',

    [`> ${Text}`]: {
      textAlign: 'center',
    },
  },
})

export const Brand = styled('div', {
  display: 'flex',
  width: '100%',

  '@media (max-width: 600px)': {
    marginBottom: '$4',
    justifyContent: 'center',
  },
})

export const InforMores = styled('div', {
  [`${Heading}`]: {
    fontSize: '$md',
    marginBottom: '$4',
  },

  a: {
    fontSize: '$sm',
    textDecoration: 'none',
    color: '$gray600',
    transition: 'all ease-in-out 0.1s',

    '&:hover': {
      color: '#ff9900',
    },
  },

  li: {
    listStyle: 'none',
    marginBottom: '$1',
  },

  ul: {
    paddingLeft: '$2',
  },
})

export const RowCredits = styled('div', {
  background: '$gray100',
  display: 'flex',
  justifyContent: 'space-between',

  padding: '$4',
  marginTop: '$8',

  a: {
    textDecoration: 'none',
  },

  '@media (max-width: 600px)': {
    flexDirection: 'column',
    textAlign: 'center',
  },
})

export const ContatInfor = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',

  svg: {
    color: '$gray800',
    display: 'block',
  },

  '> div': {
    display: 'flex',
    gap: '$4',
  },
  // gap: '$2',
})

export const SocialMedia = styled('div', {
  marginTop: '$8',
  display: 'flex',
  gap: '$2',

  '@media (max-width: 600px)': {
    justifyContent: 'center',
  },
})

export const InstagramLink = styled(Link, {
  svg: {
    color: '#C700B0',
  },
})

export const FacebookLink = styled(Link, {
  svg: {
    color: '#3b5998',
  },
})

export const YoutubeLink = styled(Link, {
  svg: {
    color: '#C4302B',
  },
})
