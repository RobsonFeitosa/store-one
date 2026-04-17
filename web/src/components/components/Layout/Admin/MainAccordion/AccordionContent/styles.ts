import * as Accordion from '@radix-ui/react-accordion'
import { keyframes, styled } from '@lemonade-technologies-hub-ui/react'

const slideDown = keyframes({
  from: { height: 0 },
  to: { height: 'var(--radix-accordion-content-height)' },
})

const slideUp = keyframes({
  from: { height: 'var(--radix-accordion-content-height)' },
  to: { height: 0 },
})

export const AccordionContentContainer = styled(Accordion.Content, {
  overflow: 'hidden',
  fontSize: 15,
  color: '$gray800',
  background: '#93c67b',

  ul: {
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '$2',
  },

  li: {
    listStyle: 'none',
  },

  a: {
    textDecoration: 'none',
    color: '$white',
    fontSize: '$sm',
  },

  '&[data-state="open"]': {
    animation: `${slideDown} 300ms cubic-bezier(0.87, 0, 0.13, 1)`,
  },
  '&[data-state="closed"]': {
    animation: `${slideUp} 300ms cubic-bezier(0.87, 0, 0.13, 1)`,
  },
})

export const AccordionText = styled('div', {
  padding: '15px 20px',
})
