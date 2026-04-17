import { Button, Text, styled } from '@lemonade-technologies-hub-ui/react'

export const CategoriesMenuContainer = styled('div', {
  position: 'relative',
  display: 'block',
  width: '100%',
})

export const ArrowUp = styled('div', {
  position: 'absolute',
  zIndex: 10,
  top: '-8px',
  right: '23px',
  width: 0,
  height: 0,
  borderLeft: '8px solid transparent',
  borderRight: '8px solid transparent',

  borderBottom: '8px solid $gray200',

  variants: {
    isLabel: {
      true: {
        right: 'auto',
        left: '23px',
      },
    },
  },
})

export const MoreOptions = styled('div', {
  paddingLeft: '30px',
  position: 'absolute',
  left: '100%',
  top: 0,
  width: '260px',
  display: 'none',
  zIndex: 10,

  '> div': {
    background: '$white',
    boxShadow: 'rgba(0, 0, 0, 0.086) 1px 1px 2px',
    borderRadius: '$md',
    padding: '$4',
    width: '100%',

    [`${Text}`]: {
      borderBottom: '1px solid $gray200',
      paddingBottom: '$2',
      marginBottom: '$2',
      display: 'block',
    },
  },

  '> div > ul': {
    padding: 0,

    'li > ul': {
      paddingLeft: '10px',
    },
  },

  a: {
    textDecoration: 'none',
    color: '$gray800',
    fontSize: '$sm',
    padding: '3px 0',
  },
})

export const WrapperUl = styled('div', {
  opacity: 0,
  visibility: 'hidden',

  position: 'absolute',
  left: '100%',
  top: 0,

  minWidth: '259px',

  paddingLeft: '30px',
})

export const ListWrapper = styled('div', {
  position: 'absolute',
  top: '100%',
  left: 0,
  width: '100%',
  minWidth: '259px',

  svg: {
    color: '$gray500',
  },

  '> div': {
    position: 'relative',
    marginTop: '30px',

    background: '$white',
    boxShadow: 'rgba(0, 0, 0, 0.086) 1px 1px 2px',
    borderRadius: '$md',
    padding: '$6',
    width: '100%',

    ul: {
      margin: 0,
      padding: 0,

      li: {
        listStyle: 'none',
        padding: '0',
        position: 'relative',

        svg: {
          transition: 'all ease-in-out 0.2s',
        },

        //   '> div': {
        //     display: 'block',
        //   },

        //   '> button >  svg': {
        //     transform: 'rotate(-95deg)',
        //   },
        // },

        ul: {
          background: '$white',
          boxShadow: 'rgba(0, 0, 0, 0.086) 1px 1px 2px',
          borderRadius: '$md',
          padding: '$2 $6',

          li: {
            borderBottom: '1px solid $gray150',
            width: '100%',

            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',

            fontSize: '$sm',
            fontWeight: '$regular',

            '&:last-child': {
              border: 0,
            },

            '> div': {
              width: '100%',
            },

            button: {
              textDecoration: 'none',
              color: '$gray800',

              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',

              width: '100%',

              '&:hover': {
                svg: {
                  transform: 'rotate(-95deg)',
                },
              },
            },
          },
        },

        '&:hover': {
          [`> ${WrapperUl}`]: {
            opacity: 1,
            visibility: 'visible',
          },
        },
      },
    },
  },
})

export const BtnGoToNav = styled('button', {
  all: 'unset',
  width: '100%',

  cursor: 'pointer',

  fontSize: '$sm',
  padding: '$4 0',
  fontWeight: '$regular',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: '12px',

  textDecoration: 'none',
})

export const MenuItem = styled('div', {
  all: 'unset',
  borderBottom: '1px solid $gray150',
  width: '100%',

  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  cursor: 'pointer',

  '&:hover': {
    '> svg': {
      transform: 'rotate(-95deg)',
    },
  },
})

export const BtnMenu = styled(Button, {
  background: '#FF9900',
  padding: '0 $4',
  minWidth: 'auto',
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  height: '60px !important',
  gap: '$6',
  borderRadius: '8px',

  [`${Text}`]: {
    color: '$white',
  },

  '@media (max-width: 980px)': {
    width: 'auto',

    [`${Text}`]: {
      display: 'none',
    },
  },

  variants: {
    hasLabel: {
      true: {
        display: 'block',
      },
    },
  },
})
