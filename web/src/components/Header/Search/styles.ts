import {
  Button,
  Text,
  TextInput,
  styled,
} from '@lemonade-technologies-hub-ui/react'

export const SearchContainer = styled('div', {
  width: '100%',
})

export const WrapperActions = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$4',

  [`${Text}`]: {
    textWrap: 'nowrap',
  },
})

export const BtnSelectCategory = styled('button', {
  all: 'unset',
})

export const ArrowUp = styled('div', {
  position: 'absolute',
  top: '-5px',
  right: '49%',
  width: 0,
  height: 0,
  borderLeft: '6px solid transparent',
  borderRight: '6px solid transparent',

  borderBottom: '6px solid $gray200',
})

export const CategoriesContent = styled('div', {
  position: 'absolute',
  top: '100%',
  left: '50%',
  transform: 'translateX(-50%)',

  '> div': {
    position: 'relative',
    marginTop: '30px',

    background: '$white',
    boxShadow: 'rgba(0, 0, 0, 0.086) 1px 1px 2px',
    borderRadius: '$md',
    padding: '$4',

    width: '240px',

    ul: {
      margin: 0,
      padding: 0,

      maxHeight: '280px',
      overflowY: 'scroll',

      li: {
        listStyle: 'none',
        padding: '0',

        button: {
          all: 'unset',
          fontSize: '$sm',
        },
      },
    },
  },
})

export const AllCategories = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '$4',
  // borderLeft: '1px solid $gray100',
  paddingLeft: '10px',
  position: 'relative',

  '@media (max-width: 680px)': {
    [`> ${Text}`]: {
      display: 'none',
    },
  },

  // button: {}
  span: {
    fontSize: '$sm',
    color: '$gray600',
  },
})

export const TextInputCustom = styled(TextInput, {})

export const ButtonSearch = styled(Button, {
  display: 'flex',
  justifyContent: 'center',
  gap: '6px',
  background: '$gray300',
  color: '$gray800 !important',
  fontWeight: '$regular',

  height: '38px',
  minWidth: '106px',
  padding: 0,
  width: 'auto',
})

export const Form = styled('div', {
  display: 'flex',
  width: '100%',
  color: '$alosixY500',
  gap: '$4',
  border: '1px solid $gray200',
  padding: '9px 9px',
  borderRadius: '$md',
  background: '$white',

  hr: {
    margin: '$1',
  },

  '> div:first-child': {
    border: 0,
    width: '100%',
  },

  '> button': {
    minWidth: '80px',
  },
})
