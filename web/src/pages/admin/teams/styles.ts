import { Box, Heading, Text, styled } from '@lemonade-technologies-hub-ui/react'

export const TeamsContainer = styled('div', {})

export const BtnAddNewTeam = styled('button', {
  all: 'unset',

  position: 'absolute',
  right: 0,
  top: 0,

  background: '$alosixG200',
  fontSize: '$sm',

  borderRadius: '$xs',
  padding: '2px $2',
  color: '$white',
})

export const ProfessionalsContent = styled('div', {})

export const BoxWrapper = styled(Box, {
  padding: '$4',
})

export const TeamsHeader = styled('div', {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: '$8',

  position: 'relative',

  [`${Heading}`]: {
    fontSize: '$lg',
  },

  marginBottom: '$4',
})

export const ProfessionalWrapper = styled('div', {
  '> div > div': {
    marginBottom: '$6',
  },

  marginTop: '40px',
})

export const TeamWrapper = styled('div', {
  '> div': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    [`${Heading}`]: {
      fontSize: '$sm',
    },
  },

  marginBottom: '$2',
})

export const ProfessionalTeam = styled('div', {
  marginTop: '3px',

  background: '$white',
  padding: '$2 10px',
  borderRadius: '$sm',

  [`${Text}`]: {
    marginBottom: '4px',
  },
})

export const TeamActions = styled('div', {
  display: 'flex',
  gap: '$2',

  button: {
    svg: {
      color: '$gray600',
      transition: 'all ease-in-out 0.1s',
    },

    '&:hover': {
      svg: {
        color: '$alosixG200',
      },
    },
  },
})

export const BtnDelete = styled('button', {
  all: 'unset',
})

export const BtnEditTeam = styled('button', {
  all: 'unset',
})

export const Professionals = styled('div', {
  [`${Text}`]: {
    marginBottom: '$2',
  },

  minHeight: '100px',

  variants: {
    isMult: {
      true: {
        overflowY: 'scroll',
      },
    },
  },
})

export const Professional = styled('div', {
  display: 'inline-block',
  marginRight: '$2',
  marginBottom: '$2',

  [`${Text}`]: {
    fontSize: '$xs',
    border: '1px solid $gray200',
    borderRadius: '$full',
    padding: '4px $4',
  },
})
