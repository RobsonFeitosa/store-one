import { styled, Heading } from '@lemonade-technologies-hub-ui/react'
import Link from 'next/link'

export const HamburgerButton = styled('button', {
  all: 'unset',
  cursor: 'pointer',
  color: '#353535',
  display: 'none',
  alignItems: 'center',
  justifyContent: 'center',

  '@media (max-width: 990px)': {
    display: 'flex',
  },
})

export const HeaderWrapper = styled('div', {
  marginBottom: 30,
  display: 'flex',
  alignItems: 'center',
  gap: '$4',

  [`${Heading}`]: {
    marginBottom: 0,
  },

  '@media (max-width: 990px)': {
    marginBottom: '$4',
  },
})

export const DashboardContainer = styled('div', {
  marginTop: '$8',

  [`${Heading}`]: {
    marginBottom: '$4',
    fontWeight: '$bold',
  },
})

export const DashBoardHeading = styled(Heading, {
  marginBottom: '$4',
})

export const BtnSignOut = styled('button', {
  all: 'unset',

  cursor: 'pointer',
})

export const LinkMenu = styled(Link, {
  textDecoration: 'none',
  color: '$gray600',

  variants: {
    actived: {
      true: {
        color: '#FF9900',
      },
    },
  },
})

export const AsideBar = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',

  '&::after': {
    content: '',
    display: 'flex',
    width: 1,
    height: 200,
    background: '#FF9900',
  },

  '@media (max-width: 990px)': {
    display: 'none',
  },
})

export const BannerWrapper = styled('div', {
  marginBottom: 40,

  img: {
    width: '100%',
    height: 'auto',
  },
})

export const DashboardWrapper = styled('div', {
  paddingTop: 40,
  paddingLeft: 15,

  '@media (max-width: 990px)': {
    paddingTop: 20,
    paddingLeft: 0,
  },
})

export const DashboardContent = styled('div', {
  '&::before': {
    content: '',
    display: 'flex',
    height: 1,
    width: 560,
    background: '#FF9900',
    position: 'relative',
    left: '-25px',
  },

  '@media (max-width: 990px)': {
    '&::before': {
      display: 'none',
    },
  },
})

export const AsideBarContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',
})

export const Asidebar = styled('aside', {
  marginBottom: '40px',

  '@media (max-width: 768px)': {
    display: 'none',
  },

  ul: {
    padding: 0,

    paddingLeft: 0,
    borderRight: '1px solid rgb(160, 226, 129)',

    button: {
      '> div': {
        width: '40px',

        svg: {
          fontSize: '24px',
        },
      },
    },
  },
})

export const Li = styled('li', {
  listStyle: 'none',
  display: 'flex',

  '> div': {
    width: '40px',

    svg: {
      fontSize: '24px',
    },
  },

  'a, button': {
    listStyle: 'none',
    marginBottom: '18px',
    fontSize: '$md',

    color: '#353535',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    border: 0,
    background: 'transparent',

    '&:hover svg': {
      transform: 'rotateY(190deg)',
    },

    svg: {
      transition: 'transform 0.4s',
      marginRight: '15px',
      fontSize: '22px',
    },
  },

  variants: {
    selected: {
      true: {
        a: {
          color: '$alosixG300',
        },

        '&::after': {
          width: '80%',
          height: '1px',
          background: 'rgb(160, 226, 129)',
          content: '',
          display: 'block',
          marginLeft: '30px',
          top: '14px',
          position: 'relative',
        },
      },
    },
  },
})

export const LeftSideBar = styled('div', {
  width: '100%',
  position: 'relative',
  display: 'none',

  '@media (max-width: 780px)': {
    display: 'block',
  },

  a: {
    color: '$gray600',
    textDecoration: 'none',
  },
})

export const NavAccount = styled('div', {
  marginBottom: '40px',

  '@media (max-width: 780px)': {
    display: 'none',
  },

  ul: {
    paddingLeft: 0,
    borderRight: '1px solid #a0e281',

    button: {
      '> div': {
        width: '40px',

        svg: {
          fontSize: '24px',
        },
      },
    },

    li: {
      '> div': {
        width: '40px',

        svg: {
          fontSize: '24px',
        },
      },

      '&.selected::after': {
        width: '80%',
        height: '1px',
        background: '#a0e281',
        content: '',
        display: 'block',
        marginLeft: '30px',
      },
    },

    'button, li': {
      listStyle: 'none',
      marginBottom: '18px',

      fontSize: '16px',
      color: '#353535',
      textDecoration: 'none',
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      border: 0,
      background: 'transparent',

      '&.selected': {
        color: '#5c9d3d',
      },

      '&:hover svg': {
        transform: 'rotateY(190deg)',
      },

      svg: {
        transition: 'transform 0.4s',
        marginRight: '15px',
        fontSize: '22px',
      },
    },
  },
})

export const NavAccountMobile = styled('div', {
  '@media (min-width: 780px)': {
    // display: 'none',
  },
  position: 'relative',

  '.btnMob': {
    position: 'absolute',
    right: '15px',
    top: '-38px',
    border: 0,
    background: 'transparent',
    display: 'flex',
    alignItems: 'center',
    color: '#353535',

    svg: {
      marginRight: '10px',
    },
  },

  ul: {
    paddingLeft: 0,
    position: 'absolute',
    right: 0,
    top: '-11px',
    width: '200px',
    zIndex: 3,
    background: '#fbfbfb',
    padding: '20px',
    border: '1px solid #a0e281',

    button: {
      '> div': {
        width: '40px',

        svg: {
          fontSize: '24px',
        },
      },
    },

    li: {
      '> div': {
        width: '40px',

        svg: {
          fontSize: '20px',
        },
      },
    },

    '> li': {
      '&:last-child': {
        marginBottom: 0,
      },
    },

    'button, li': {
      listStyle: 'none',
      marginBottom: '12px',

      fontSize: '14px',
      color: '#353535',
      textDecoration: 'none',
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      border: 0,
      background: 'transparent',

      '&.selected': {
        color: '#5c9d3d',
      },

      '&:hover svg': {
        transform: 'rotateY(190deg)',
      },

      svg: {
        transition: 'transform 0.4s',
        marginRight: '15px',
        fontSize: '20px',
      },
    },
  },
})
export const MenuMobileContainer = styled('div', {
  background: '$white',
  padding: '$4',
  border: '1px solid $gray100',
  borderRadius: '$md',
  boxShadow: '0px 10px 15px -3px rgba(0,0,0,0.1)',
  marginBottom: '$6',

  display: 'flex',
  flexDirection: 'column',
  gap: '$4',

  'a, button': {
    textDecoration: 'none',
    color: '$gray700',
    fontSize: '$md',
    fontWeight: '$medium',
    transition: 'color 0.2s',

    '&:hover': {
      color: '#FF9900',
    },
  },

  '@media (min-width: 991px)': {
    display: 'none',
  },
})
