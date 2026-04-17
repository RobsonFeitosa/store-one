import { Heading, styled } from '@lemonade-technologies-hub-ui/react'

export const RegisterContainer = styled('div', {
  h3: {
    fontSize: '$lg',
  },
})

export const RegisterContent = styled('div', {
  display: 'block',
  marginTop: '$4',
})

export const Form = styled('div', {
  display: 'flex',
  color: '$alosixY500',
  flexDirection: 'column',
  gap: '$4',

  '.groupLabel label': {
    display: 'flex',
    flexDirection: 'column',
    gap: '$2',
  },

  [`${Heading}`]: {
    fontSize: '$sm',
    marginTop: '$4',
    marginBottom: '$2',
  },

  '@media (max-width: 768px)': {
    marginBottom: '$4',
  },
})

export const AvatarInput = styled('div', {
  marginBottom: '32px',
  marginTop: 0,
  position: 'relative',
  alignSelf: 'center',
  background: '#312e30',
  borderRadius: '4%',
  minHeight: '180px',
  minWidth: '180px',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  // .imgCropRegister {
  //   canvas {
  //     width: 200px,
  //     height: 200px,
  //     border-radius: 4%,
  //     display: block,
  //   }
  // }

  '> svg ': {
    color: ' #ffffff33',
    fontSize: '60px',
  },

  label: {
    position: 'absolute',
    width: '48px',
    height: '48px',
    background: '#ffffffaa',
    borderRadius: '50%',
    right: '7px',
    bottom: 0,
    border: 0,
    cursor: 'pointer',
    transition: 'backgroundColor 0.2s',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    input: {
      display: 'none',
    },

    svg: {
      width: '20px',
      height: '20px',
      color: '#ffffff',
    },

    '&:hover': {
      background: '#5c9d3d',
    },
  },
})
