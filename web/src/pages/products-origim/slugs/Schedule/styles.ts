import { Text, styled } from '@lemonade-technologies-hub-ui/react'

export const ScheduleContainer = styled('div', {
  width: '100%',
  minWidth: '500px',
  '@media(max-width: 520px)': {
    minWidth: '100%',
    width: 320,
  },
})

export const SwitchProfessionalWrapper = styled('div', {
  [`> ${Text}`]: {
    marginBottom: '$4',
  },
})

export const LoadingWrapper = styled('div', {
  marginTop: '$4',
})

export const CalendarWrapper = styled('div', {
  width: '100%',

  variants: {
    isDateSelected: {
      true: {
        width: 480,

        '@media(max-width: 900px)': {
          width: 380,
        },
      },
    },
  },
})

export const ScheduleContent = styled('div', {
  margin: '$6 auto 0',
  padding: 0,
  display: 'grid',
  position: 'relative',

  variants: {
    isTimePickerOpen: {
      true: {
        gridTemplateColumns: '1fr 280px',

        '@media(max-width: 900px)': {
          display: 'block',
        },
      },
      false: {
        width: 540,
        gridTemplateColumns: '1fr',
      },
    },
  },
})

export const TimePicker = styled('div', {
  borderLeft: '1px solid $gray300',
  padding: '$6 $6 0',
  background: '$gray200',

  position: 'absolute',
  top: 0,
  bottom: 0,
  right: 0,
  width: 280,

  '@media(max-width: 900px)': {
    position: 'relative',
    width: '100%',

    borderTop: '1px solid $gray300',
    borderLeft: 0,
  },

  variants: {
    isScroll: {
      true: {
        overflowY: 'scroll',
      },
    },
  },
})

export const TimePickerHeader = styled(Text, {
  fontWeight: '$medium',

  span: {
    color: '$gray600',
  },
})

export const TimePickerList = styled('div', {
  marginTop: '$3',
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '$2',

  // '@media (max-width: 900px)': {
  //   gridTemplateColumns: '2fr',
  // },

  '@media(max-width: 900px)': {
    gridTemplateColumns: 'repeat(3, 1fr)',
    paddingBottom: '$8',
  },

  '@media(max-width: 520px)': {
    gridTemplateColumns: 'repeat(4, 1fr)',
  },
})

export const TimePickerItem = styled('button', {
  border: 0,
  backgroundColor: '$gray500',
  padding: '$2 0',
  cursor: 'pointer',
  color: '$gray100',
  borderRadius: '$sm',
  fontSize: '$sm',
  lineHeight: '$base',

  '&:last-child': {
    marginBottom: '$6',
  },

  '&:disabled': {
    background: 'none',
    cursor: 'default',
    opacity: 0.4,
  },

  '&:not(:disabled):hover': {
    background: '#ff9900',
    color: '#gray500',
  },

  '&:focus': {
    boxShadow: '0 0 0 2px #ff9900',
  },

  '@media(max-width: 900px)': {
    '&:last-child': {
      marginBottom: 0,
    },
  },
})
