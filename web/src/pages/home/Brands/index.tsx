import Image from 'next/image'
import { ArrowsBox, BrandHeader, BrandsContainer } from './styles'
import brand1 from '@/assets/temp/example-provider-1.png'
import brand2 from '@/assets/temp/example-provider-2.png'
import brand3 from '@/assets/temp/example-provider-3.png'
import brand4 from '@/assets/temp/example-provider-4.png'
import brand5 from '@/assets/temp/example-provider-5.png'
import brand6 from '@/assets/temp/example-provider-6.png'
import brand7 from '@/assets/temp/example-provider-7.png'

import { useState } from 'react'
import { Container, Row } from 'react-bootstrap'
import { useKeenSlider } from 'keen-slider/react'
import ArrowSlider from '@/components/ArrowSlider'
import { Heading } from '@lemonade-technologies-hub-ui/react'

export default function Brands() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)

  const [ref, instanceRef] = useKeenSlider<HTMLDivElement>({
    renderMode: 'performance',
    slideChanged(s) {
      setCurrentSlide(s.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
    slides: {
      perView: 7,
      spacing: 30,
    },
    breakpoints: {
      '(max-width: 1200px)': {
        slides: {
          perView: 6,
          spacing: 30,
        },
      },
      '(max-width: 990px)': {
        slides: {
          perView: 4,
          spacing: 30,
        },
      },
      '(max-width: 600px)': {
        slides: {
          perView: 3,
          spacing: 30,
        },
      },
      '(max-width: 500px)': {
        slides: {
          perView: 2,
          spacing: 30,
        },
      },
    },
  })

  return (
    <BrandsContainer>
      <Container>
        <Row>
          <BrandHeader>
            <div>
              <Heading as="h2">Marcas</Heading>
            </div>

            {loaded && instanceRef.current && (
              <ArrowsBox>
                <ArrowSlider
                  left
                  onClick={(e: any) =>
                    e.stopPropagation() || instanceRef.current?.prev()
                  }
                  disabled={currentSlide === 0}
                />

                <ArrowSlider
                  onClick={(e: any) =>
                    e.stopPropagation() || instanceRef.current?.next()
                  }
                  disabled={
                    currentSlide ===
                    instanceRef.current.track.details.slides.length - 4
                  }
                />
              </ArrowsBox>
            )}
          </BrandHeader>
        </Row>
        <Row>
          <div ref={ref} className="keen-slider">
            <div className={`keen-slider__slide number-slide1`}>
              <Image src={brand1} width={140} height={100} alt="Fornecedor 1" />
            </div>
            <div className={`keen-slider__slide number-slide2`}>
              <Image src={brand2} width={140} height={100} alt="Fornecedor 2" />
            </div>
            <div className={`keen-slider__slide number-slide3`}>
              <Image src={brand3} width={140} height={100} alt="Fornecedor 3" />
            </div>
            <div className={`keen-slider__slide number-slide4`}>
              <Image src={brand4} width={140} height={100} alt="Fornecedor 4" />
            </div>
            <div className={`keen-slider__slide number-slide5`}>
              <Image src={brand5} width={140} height={100} alt="Fornecedor 5" />
            </div>
            <div className={`keen-slider__slide number-slide6`}>
              <Image src={brand6} width={140} height={100} alt="Fornecedor 6" />
            </div>
            <div className={`keen-slider__slide number-slide7`}>
              <Image src={brand7} width={140} height={100} alt="Fornecedor 7" />
            </div>
            <div className={`keen-slider__slide number-slide8`}>
              <Image src={brand4} width={140} height={100} alt="Fornecedor 8" />
            </div>
          </div>
        </Row>
      </Container>
    </BrandsContainer>
  )
}
