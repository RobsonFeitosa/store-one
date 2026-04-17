import Image from 'next/image'
import { useState } from 'react'
import { ImageMagnifierContainer } from './styles'

export default function ImageMagnifier({
  src,
  magnifierHeight = 150,
  magnifieWidth = 150,
  zoomLevel = 1.5,
}: {
  src: string
  magnifierHeight?: number
  magnifieWidth?: number
  zoomLevel?: number
}) {
  const [[x, y], setXY] = useState([0, 0])
  const [[imgWidth, imgHeight], setSize] = useState([0, 0])
  const [showMagnifier, setShowMagnifier] = useState(false)

  return (
    <ImageMagnifierContainer>
      <Image
        src={src}
        onMouseEnter={(e) => {
          const elem = e.currentTarget
          const { width, height } = elem.getBoundingClientRect()
          setSize([width, height])
          setShowMagnifier(true)
        }}
        layout="fill"
        objectFit="contain"
        onMouseMove={(e) => {
          const elem = e.currentTarget
          const { top, left } = elem.getBoundingClientRect()

          const x = e.pageX - left - window.scrollX
          const y = e.pageY - top - window.scrollY
          setXY([x, y])
        }}
        onMouseLeave={() => {
          setShowMagnifier(false)
        }}
        alt={'img'}
      />

      <div
        style={{
          display: showMagnifier ? '' : 'none',
          position: 'absolute',
          pointerEvents: 'none',
          height: `${magnifierHeight}px`,
          width: `${magnifieWidth}px`,
          top: `${y - magnifierHeight / 2}px`,
          left: `${x - magnifieWidth / 2}px`,
          opacity: '1',
          border: '1px solid lightgray',
          backgroundColor: 'white',
          backgroundImage: `url('${src}')`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: `${imgWidth * zoomLevel}px ${
            imgHeight * zoomLevel
          }px`,

          backgroundPositionX: `${-x * zoomLevel + magnifieWidth / 2}px`,
          backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`,
        }}
      ></div>
    </ImageMagnifierContainer>
  )
}
