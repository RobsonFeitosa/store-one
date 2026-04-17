import * as Accordion from '@radix-ui/react-accordion'
import { Text, styled } from '@lemonade-technologies-hub-ui/react'
import { CaretDown } from 'phosphor-react'

export const Trigger = styled(Accordion.Trigger, {
  all: 'unset',
  color: '$white',

  fontSize: '$sm',
  fontWeight: '$regular',
})

export const BtnLink = styled('button', {
  all: 'unset',
  fontFamily: 'inherit',
  height: 52,
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  gap: '$2',

  textDecoration: 'none',
  color: '$white',

  fontSize: '$sm',
  fontWeight: '$regular',

  '> div': {
    display: 'flex',
    gap: '$2',
  },
})

export const StyledChevron = styled(CaretDown, {
  color: '$white',
  transition: 'transform 300ms cubic-bezier(0.87, 0, 0.13, 1)',
  '[data-state=open] &': { transform: 'rotate(180deg)' },
  width: '20px',
})

export const AccordionTriggerContainer = styled(Accordion.Header, {
  all: 'unset',
  display: 'flex',
  padding: '0 $4',

  [`${Text}`]: {
    color: '$white',
  },

  transition: 'all ease-in-out 0.2s',

  variants: {
    isMinimize: {
      true: {
        padding: '0',
        button: {
          width: '20px',
          padding: '0 13px',
          overflow: 'hidden',

          [`${BtnLink}`]: {
            flex: 'none',
          },
        },
      },
    },
  },
})
