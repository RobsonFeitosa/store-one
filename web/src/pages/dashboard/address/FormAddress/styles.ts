import { Button, styled } from '@lemonade-technologies-hub-ui/react'

export const FormAddressContainer = styled('div', {
  width: '32rem',
})

export const AddressSearchZip = styled('div', {})

export const Hr = styled('hr', {
  borderColor: '$gray800',
})

export const Form = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$6',

  marginTop: 20,

  '> div': {
    width: '100%',
  },
})

export const RowFlex = styled('div', {
  display: 'flex',
  gap: 20,

  '> div': {
    width: '100%',
  },
})

export const LabelPrimary = styled('label', {
  display: 'flex',
  gap: '$4',
  alignItems: 'center',
})

export const BtnAddress = styled(Button, {})
