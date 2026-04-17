import { styled } from '@lemonade-technologies-hub-ui/react'

export const UploadImageContainer = styled('div', {
  width: '100%',
  height: '100%',

  background: '$white',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '2px dashed $alosixG200',
  boxSizing: 'border-box',
  cursor: 'pointer',
  overflow: 'hidden',

  position: 'relative',
  zIndex: 1,
})

export const ImageSingle = styled('div', {
  position: 'relative',

  background: 'transparent',
  zIndex: 1,
  width: '100%',
})

export const ImageContent = styled('div', {
  display: 'grid',
  width: '100%',
  height: '100%',
  gridGap: '$2',
})

export const UploadImageContentSingle = styled('div', {})

export const UploadImageContent = styled('div', {
  position: 'relative',
  zIndex: 2,
  display: 'flex',
  height: '100%',
})

export const Input = styled('input', {})

export const BtnRemove = styled('button', {
  position: 'absolute',
  zIndex: 3,
  right: '$2',
  top: '$2',
})
