import { Text, styled } from '@lemonade-technologies-hub-ui/react'
import * as Accordion from '@radix-ui/react-accordion'

export const MainAccordionContainer = styled('div', {
  [`${Text}`]: {
    textWrap: 'nowrap',
    opacity: 1,
    transition: 'all ease-in-out 0.2s',
    visibility: 'visible',
  },

  variants: {
    isMinimize: {
      true: {
        [`${Text}`]: {
          opacity: 0,
          visibility: 'hidden',
        },
      },
    },
  },
})

export const ArrowDown = styled('div', {
  width: 10,
  height: '6px',
  margin: '0 auto',
  marginTop: '-6px',
  marginBottom: '6px',

  borderStyle: 'solid',
  borderWidth: '5px 5px 0px',
  borderColor: '$gray100 transparent transparent transparent',
})

export const AccordionRoot = styled(Accordion.Root, {
  borderRadius: 6,
  width: '100%',
  backgroundColor: 'transparent',
  boxShadow: `0 2px 10px $gray500`,

  '> div': {
    borderBottom: '1px solid #93c67b',

    '&:last-child': {
      border: 0,
    },
  },
})

export const MenuWrapper = styled('div', {})

export const FloatSubmenu = styled('div', {
  width: '200px',
  height: 'auto',
  background: '#93c67b',
  padding: '$4',

  position: 'absolute',
  right: '-200px',
  top: 0,
  zIndex: 9999,

  opacity: 0,
  visibility: 'hidden',

  ul: {
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  li: {
    listStyle: 'none',

    a: {
      fontSize: '$sm',
      color: '$white',
      textDecoration: 'none',
    },
  },
})

export const AccordionItem = styled(Accordion.Item, {
  marginTop: 1,
  backgroundColor: 'transparent',
  position: 'relative',

  '&:first-child': {
    marginTop: 0,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },

  '&:last-child': {
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },

  '&:focus-within': {
    position: 'relative',
    zIndex: 1,
    boxShadow: `0 0 0 2px $gray200`,
  },

  '&:hover': {
    [`${FloatSubmenu}`]: {
      opacity: 1,
      visibility: 'visible',
    },
  },
})
