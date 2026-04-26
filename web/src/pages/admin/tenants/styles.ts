import { Box, Heading, Text, styled } from '@lemonade-technologies-hub-ui/react'

export const TenantsContainer = styled('div', {})

export const BtnAddNewTenant = styled('button', {
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

export const TenantsContent = styled('div', {})

export const BoxWrapper = styled(Box, {
  padding: '$4',
})

export const TenantsHeader = styled('div', {
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

export const TenantWrapper = styled('div', {
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

export const TenantActions = styled('div', {
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

export const BtnEditTenant = styled('button', {
  all: 'unset',
})

export const TenantListWrapper = styled('div', {
  '> div > div': {
    marginBottom: '$6',
  },

  marginTop: '40px',
})
