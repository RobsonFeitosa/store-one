import { styled, Button } from '@lemonade-technologies-hub-ui/react'

export const FormAttributeContainer = styled('div', {
  width: '100%',
  display: 'flex',
})

export const VariationsWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$4',

  marginRight: '$8',

  '> div': {
    width: '200px',
  },
})

export const Form = styled('div', {
  display: 'flex',
  color: '$alosixY500',
  gap: '$4',

  marginTop: '$4',

  hr: {
    margin: '$1',
  },
})

export const AttributesContent = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$4',
  width: '100%',
})

export const BtnRemoveAttr = styled('button', {
  all: 'unset',

  display: 'inline-block',
  margin: '4px',

  background: '$gray100',
  padding: '2px 8px',
  borderRadius: '$sm',
})

export const AttributesValue = styled('div', {
  border: '1px solid $gray200',
  padding: '$2 $4',
  width: '100%',

  // display: 'flex',
  // gap: '$4',

  minHeight: '48px',

  alignItems: 'center',
  justifyContent: 'center',

  textAlign: 'center',
})

export const BtnVariation = styled(Button, {
  padding: '0',
  minWidth: '40px',
})

export const AttributesWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$4',

  '> div': {
    width: '200px',
  },
})

