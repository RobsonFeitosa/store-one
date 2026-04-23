import { Text, styled } from '@lemonade-technologies-hub-ui/react'

export const UploadImageContainer = styled('div', {
  width: '100%',
  height: '100%',
})

export const UploadContent = styled('div', {
  width: '100%',

  background: '$white',
  height: '60px',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '2px dashed $gray200',
  boxSizing: 'border-box',
  cursor: 'pointer',
  overflow: 'hidden',

  position: 'relative',
  zIndex: 1,

  [`${Text}`]: {
    color: '$gray300',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export const ImageSingle = styled('div', {
  position: 'relative',

  background: 'transparent',
  zIndex: 1,
  width: '100%',
})

export const ImageContent = styled('div', {
  display: 'grid',
  gridTemplateColumns: `repeat(3, 1fr)`,
  gridGap: '$2',

  width: '100%',
  height: '100%',

  marginTop: '$4',
})

export const LoadingWrapper = styled('div', {
  height: '100%',
  width: '100%',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

export const UploadImageContent = styled('div', {
  position: 'relative',
  zIndex: 2,
  display: 'flex',
  height: '81px',
  width: '81px',
})

export const UploadImageContentSingle = styled(UploadImageContent, {
  height: '100%',
  width: '100%',
})

export const Input = styled('input', {})

export const BtnRemove = styled('button', {
  all: 'unset',

  position: 'absolute',
  zIndex: 3,
  right: '4px',
  top: '4px',

  width: '15px',
  height: '15px',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  background: '$white',
  borderRadius: '100%',
  padding: '2px',

  svg: {
    fontSize: '14px',
  },

  transition: 'all ease-in-out 0.1s',

  '&:hover': {
    background: '$alosixG200',

    svg: {
      color: '$white',
    },
  },
})
