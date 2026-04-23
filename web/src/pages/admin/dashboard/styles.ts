import { Heading, Text, styled } from '@lemonade-technologies-hub-ui/react'

export const DashaboardContainer = styled('div', {
  padding: '0 $6',
  marginTop: '$10',

  [`${Heading}`]: {
    fontSize: '$md',
    marginBottom: '$2',
  },
})

export const ShortInfor = styled('div', {
  display: 'flex',
  gap: '$2',
  justifyContent: 'space-between',

  '@media (max-width: 1600px)': {
    display: 'block',
    textAlign: 'center',

    '> div': {
      display: 'inline-block',
      width: 'max-content',
      margin: '0 10px',
      marginBottom: '10px',
    },
  },
})

export const CircleIcon = styled('div', {
  width: '50px',
  height: '50px',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  borderRadius: '$full',
  background: '#D5EEB7',

  svg: {
    color: '#68B515',

    display: 'flex',
    alignItems: 'center',
  },

  variants: {
    color: {
      yellow: {
        background: '#fff3c9',
        svg: {
          color: '#ceae3d',
        },
      },
      red: {
        background: '#fbd8d8',
        svg: {
          color: '#d24c4c',
        },
      },
      azul: {
        background: '#c4eeff',
        svg: {
          color: '#2bade2',
        },
      },
      violet: {
        background: '#f8d8fb',
        svg: {
          color: '#ca3ed7',
        },
      },
    },
  },
})

export const GraficWrapperTop = styled('div', {
  // marginTop: '$8',
})

export const GraficTopSales = styled('div', {
  border: '1px solid $gray200',
  borderRadius: '$sm',

  padding: '$6 $4',
})

export const GraficSales = styled('div', {
  border: '1px solid $gray200',
  borderRadius: '$sm',

  padding: '$4 $4',
})

export const GraficInfor = styled('div', {
  marginTop: '$10',

  display: 'grid',
  gridTemplateColumns: 'auto 40%',
  gridGap: '$10',

  '@media (max-width: 1000px)': {
    display: 'block',

    '> div:first-child': {
      marginBottom: '30px',
    },
  },
})

export const InforBox = styled('div', {
  border: '1px solid $gray200',
  borderRadius: '$sm',
  padding: '14px 30px',

  '> div': {
    display: 'flex',
    alignItems: 'center',
    gap: '$4',
  },
})

export const InforContent = styled('div', {
  '> div': {
    display: 'flex',
    alignItems: 'flex-end',
    gap: '$2',
    justifyContent: 'space-between',

    marginBottom: '2px',

    [`> ${Text}:first-child`]: {
      fontWeight: 500,
      color: '$gray600',

      lineHeight: 'normal',
    },
  },
})

export const SallesWrapper = styled('div', {
  display: 'grid',
  gridTemplateColumns: '50% auto',
  gridGap: '$10',

  marginTop: '$10',

  '@media (max-width: 1350px)': {
    display: 'block',

    '> div:first-child': {
      marginBottom: '30px',
    },
  },
})

export const SallesLastOrder = styled('div', {
  border: '1px solid $gray200',
  padding: '$4',
  borderRadius: '$sm',

  [`${Heading}`]: {
    marginBottom: '$4',
  },

  paddingBottom: '8px',
})

export const ListOrders = styled('div', {})

export const ListScheduling = styled('div', {})

export const ListHeaders = styled('div', {
  display: 'grid',
  gridTemplateColumns: '15% auto 14% 24% 15%',
  gridGap: '$4',
  alignItems: 'center',

  background: '$gray100',
  borderRadius: '$xs',
  padding: '2px $2',
})

export const ListHeadersScheduling = styled('div', {
  display: 'grid',
  gridTemplateColumns: '20% auto 25% 15%',
  alignItems: 'center',
  gridGap: '$2',

  borderRadius: '$xs',
  background: '$gray100',
  padding: '2px $2',
})

export const TextColor = styled(Text, {
  color: '$alosixG200',
  display: 'flex',
  alignItems: 'center',
  gap: '4px',

  span: {
    lineHeight: 'normal',
  },

  variants: {
    isNegative: {
      true: {
        color: '#eb1e34',
      },
    },
  },
})

export const ListContent = styled('div', {
  marginTop: '$2',

  '> div': {
    display: 'grid',
    gridTemplateColumns: '15% auto 14% 24% 15%',
    gridGap: '$4',

    marginBottom: '5px',

    [`${Text}:not(${TextColor})`]: {
      color: '$gray500',
    },
  },

  padding: '0 $2',
})

export const ListContentScheduling = styled('div', {
  marginTop: '$2',

  '> div': {
    display: 'grid',
    gridTemplateColumns: '20% auto 25% 15%',
    alignItems: 'flex-start',
    gridGap: '$2',

    marginBottom: '5px',

    [`${Text}:not(${TextColor})`]: {
      color: '$gray500',
    },
  },

  padding: '0 $2',
})

export const SchedulingLast = styled('div', {
  border: '1px solid $gray200',
  padding: '$4',
  borderRadius: '$sm',

  [`${Heading}`]: {
    marginBottom: '$4',
  },

  paddingBottom: '8px',
})
