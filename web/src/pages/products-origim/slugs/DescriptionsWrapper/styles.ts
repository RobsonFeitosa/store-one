import { Text, styled } from '@lemonade-technologies-hub-ui/react'

export const DescriptionsWrapperContainer = styled('div', {
  border: '1px solid $gray200',
  borderRadius: '$md',

  padding: '$4',

  [`${Text}`]: {
    color: '$gray500',
  },
})

export const DescriptionContent = styled('div', {
  marginTop: '$4',
})

export const ReturnShipping = styled('div', {
  [`${Text}`]: {
    marginBottom: '$4',
  },
})

export const DescriptionHeaders = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$10',

  '@media (max-width: 458px)': {
    display: 'block',

    button: {
      display: 'block',
    },
  },
})

export const BtnSwitch = styled('button', {
  all: 'unset',

  fontSize: '$lg',
  color: '$gray800',
  borderBottom: '3px solid transparent',

  variants: {
    actived: {
      true: {
        borderColor: '$gray800',
      },
    },
  },
})
