import { styled } from '@lemonade-technologies-hub-ui/react'

export const ProductsGalleryContainer = styled('div', {})

export const ImageContent = styled('div', {
  border: '1px solid $gray100',
  position: 'relative',

  borderRadius: '$md',

  '> svg': {
    color: '$gray200',

    position: 'absolute',
    zIndex: 1,
    top: '50%',
    left: '50%',

    transform: 'translate(-50%, -50%)',
  },

  marginTop: '$2',

  background: '$gray100',

  '> div': {
    background: '$white',
  },

  height: '450px',

  '@media (max-width: 990px)': {
    display: 'block',

    '> div > div': {
      width: '100% !important',
      display: 'flex',
      alignItems: 'center',
    },
  },
})

export const ThumbnailContent = styled('div', {
  display: 'flex',
  overflow: 'hidden',

  img: {
    width: '100%',
    height: 'auto',
  },

  '.keen-slider__slide': {
    border: '1px solid $gray100',

    borderRadius: '$md',
    overflow: 'hidden',

    fontSize: '30px',
    marginTop: '10px',
    height: '100px',
    cursor: 'pointer',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  '.keen-slider__slide.active': {
    border: '2px solid #ff9900',
  },
})
