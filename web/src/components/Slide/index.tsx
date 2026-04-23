import {
  ArrowsBox,
  BtnBuyNow,
  SlicerContent,
  SlideContainer,
  WrapperContent,
} from './styles'
import slide1 from '@/assets/slide1.png'
import slide2 from '@/assets/slide2.png'
import { useKeenSlider, KeenSliderPlugin } from 'keen-slider/react'
import { useState } from 'react'
import Image from 'next/image'
import { Heading, Text } from '@lemonade-technologies-hub-ui/react'
import ArrowSlider from '../ArrowSlider'
import { useRouter } from 'next/router'

const AdaptiveHeight: KeenSliderPlugin = (slider) => {
  function updateHeight() {
    slider.container.style.height =
      slider.slides[slider.track.details.rel].offsetHeight + 'px'
  }
  slider.on('created', updateHeight)
  slider.on('slideChanged', updateHeight)
}

export default function Slide() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      initial: 0,
      renderMode: 'performance',
      slideChanged(s) {
        setCurrentSlide(s.track.details.rel)
      },
      created() {
        setLoaded(true)
      },
    },
    [AdaptiveHeight],
  )

  const router = useRouter()

  function handleBuyNow() {
    router.push(
      '/products/novo-echo-show-5-3ª-geracao-2023-smart-display-com-alexa-graves-2x-mais-potentes-e-som-mais-nitido-cor-preta/0c9e95fa-d424-4e74-a710-6a0483a16685',
    )
  }

  return (
    <SlideContainer>
      <div ref={sliderRef} className="keen-slider">
        <div
          className={`keen-slider__slide number-slide1 ${currentSlide === 0 && 'actived'
            }`}
        >
          <SlicerContent>
            <WrapperContent isLeftAnimation={true}>
              <div>
                <Heading as="h2">Deixe sua vida mais emocionante!</Heading>
                <Text>Nova coleção de acessórios mac</Text>
              </div>
              <BtnBuyNow onClick={handleBuyNow}>Comprar agora</BtnBuyNow>
            </WrapperContent>
            <Image src={slide1} width={1920} height={550} alt="slide1" />
          </SlicerContent>
        </div>
        <div
          className={`keen-slider__slide number-slide2 ${currentSlide === 1 && 'actived'
            }`}
          style={{ height: '100%' }}
        >
          <SlicerContent>
            <WrapperContent isTopAnimation={true}>
              <div>
                <Heading as="h2">Som ambiente potente e forte!</Heading>
                <Text>Nova coleção de acessórios mac</Text>
              </div>
              <BtnBuyNow onClick={handleBuyNow}>Comprar agora</BtnBuyNow>
            </WrapperContent>
            <Image src={slide2} width={1920} height={550} alt="slide2" />
          </SlicerContent>
        </div>
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
              instanceRef.current.track.details.slides.length - 1
            }
          />
        </ArrowsBox>
      )}
    </SlideContainer>
  )
}
