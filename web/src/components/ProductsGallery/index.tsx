import {
  ImageContent,
  ProductsGalleryContainer,
  ThumbnailContent,
} from './styles'
import {
  KeenSliderInstance,
  KeenSliderPlugin,
  useKeenSlider,
} from 'keen-slider/react'
import { MutableRefObject, useEffect } from 'react'
import { IArchiveDTO } from '@/pages/dtos/archive.dto'
import 'keen-slider/keen-slider.min.css'
import Image from 'next/image'
import ImageMagnifier from './ImageMagnifier'
import { ImageSquare } from 'phosphor-react'

function ThumbnailPlugin(
  mainRef: MutableRefObject<KeenSliderInstance | null>,
): KeenSliderPlugin {
  return (slider) => {
    function removeActive() {
      slider.slides.forEach((slide) => {
        slide.classList.remove('active')
      })
    }
    function addActive(idx: number) {
      slider.slides[idx].classList.add('active')
    }

    function addClickEvents() {
      slider.slides.forEach((slide, idx) => {
        slide.addEventListener('click', () => {
          if (mainRef.current) mainRef.current.moveToIdx(idx)
        })
      })
    }

    slider.on('created', () => {
      if (!mainRef.current) return
      addActive(slider.track.details.rel)
      addClickEvents()
      mainRef.current.on('animationStarted', (main) => {
        removeActive()
        const next = main.animator.targetIdx || 0
        addActive(main.track.absToRel(next))
        slider.moveToIdx(Math.min(slider.track.details.maxIdx, next))
      })
    })
  }
}

interface ProductsGalleryProps {
  images: IArchiveDTO[]
}

export default function ProductsGallery({ images }: ProductsGalleryProps) {
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
  })
  const [thumbnailRef, instanceThumbRef] = useKeenSlider<HTMLDivElement>(
    {
      initial: 0,
      slides: {
        perView: 4,
        spacing: 10,
      },
    },
    [ThumbnailPlugin(instanceRef)],
  )

  const thumb = instanceThumbRef.current
  const slide = instanceRef.current

  useEffect(() => {
    thumb?.update()
    slide?.update()

    return () => {
      thumb?.destroy()
      slide?.destroy()
    }
  }, [images, slide, thumb])

  return (
    <ProductsGalleryContainer>
      <>
        <ImageContent ref={sliderRef} className="keen-slider">
          {images.length === 0 && <ImageSquare size={32} />}
          {images?.map((image, index) => (
            <div
              className={`keen-slider__slide number-slide${index}`}
              key={image.id}
            >
              <ImageMagnifier src={image.picture_url} />
            </div>
          ))}
        </ImageContent>

        <ThumbnailContent ref={thumbnailRef} className="keen-slider thumbnail">
          {images?.map((image, index) => (
            <div
              className={`keen-slider__slide number-slide${index}`}
              key={image.id}
            >
              <Image
                src={image.picture_url}
                layout="fill"
                objectFit="contain"
                alt="slide1"
              />
            </div>
          ))}
        </ThumbnailContent>
      </>
    </ProductsGalleryContainer>
  )
}
