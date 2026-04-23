import { Button, styled } from '@lemonade-technologies-hub-ui/react'

export const CategoriesContainer = styled('div', {})

export const Category = styled('div', {})

export const LabelCategory = styled('label', {
  display: 'flex',
  gap: '$2',

  alignItems: 'center',
})

export const WrapperBtns = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
})

export const WrapperActions = styled('div', {
  borderBottom: '1px solid $gray100',
  paddingBottom: '$2',
  marginBottom: '$2',
})

export const BtnAddCategory = styled(Button, {
  display: 'flex',
  gap: '$2',
  padding: '0 6px',

  marginTop: 0,
  marginBottom: 0,
})

export const Form = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  color: '$alosixY500',
  gap: '$2',
})

