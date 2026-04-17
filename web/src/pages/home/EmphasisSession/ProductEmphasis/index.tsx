import 'keen-slider/keen-slider.min.css'
import { Text } from '@lemonade-technologies-hub-ui/react'
import { IProductDTO } from '@/pages/dtos/product.dto'
import { useKeenSlider } from 'keen-slider/react'
import { FaStar, FaStarHalfAlt } from 'react-icons/fa'
import Image from 'next/image'
import { useState } from 'react'
import formatValue from '@/utils/formatValue'
import Link from 'next/link'
import { ImageSquare, Lightning } from 'phosphor-react'
import WishProduct from '@/components/ProductBox/WishProduct'
import AddProduct from '@/components/ProductBox/AddProduct'

import {
  BtnStarComment,
  CircleFlash,
  Dots,
  EmptyIcon,
  OldPrice,
  Price,
  PriceWrapper,
  ProductActions,
  ProductDescriptions,
  ProductEmphasisContainer,
  ProductFigure,
  ProductFigureContent,
  StarsWrapper,
  TextCrop,
  TimeDiscountTag,
} from './styles'
import useCountdownTimer from '@/components/ProductBox/TimeDiscount/useCountDownTimer'
import discountPrice from '@/components/ProductBox/discountPrice'

interface ProductProps {
  product: IProductDTO
}

export default function ProductEmphasis({ product }: ProductProps) {
  const [opacities, setOpacities] = useState<number[]>([])

  const [currentSlide, setCurrentSlide] = useState(0)

  const [sliderRef, instanceRef] = useKeenSlider(
    {
      slides: 2,
      drag: false,
      loop: true,
      detailsChanged(s) {
        const new_opacities = s?.track?.details?.slides.map(
          (slide) => slide.portion,
        )
        setOpacities(new_opacities)
      },
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel)
      },
      created() {
        setLoaded(true)
      },
    },
    [
      (slider) => {
        if (product.images?.length === 0) {
          return
        }

        let timeout: ReturnType<typeof setTimeout>
        let mouseOver = false
        function clearNextTimeout() {
          clearTimeout(timeout)
        }
        function nextTimeout() {
          clearTimeout(timeout)
          if (mouseOver) return
          timeout = setTimeout(() => {
            slider.next()
          }, 12000)
        }
        slider.on('created', () => {
          slider.container.addEventListener('mouseover', () => {
            mouseOver = true
            clearNextTimeout()
          })
          slider.container.addEventListener('mouseout', () => {
            mouseOver = false
            nextTimeout()
          })
          nextTimeout()
        })
        slider.on('dragStarted', clearNextTimeout)
        slider.on('animationEnded', nextTimeout)
        slider.on('updated', nextTimeout)
      },
    ],
  )

  const [loaded, setLoaded] = useState(false)

  const isTimeDiscount = !!product.time_discount

  function handleStarComment() {
    // console.log('chegouu1231')
  }

  const images = product.images?.slice(0, 2)

  const { days, hours, minutes, seconds } = useCountdownTimer(
    product.time_discount?.endDate.toString() ?? '',
  )

  const isPromotion = !!product.time_discount

  const price = discountPrice(
    product.price,
    product.time_discount?.discount ?? 0,
  )

  return (
    <ProductEmphasisContainer>
      <ProductFigure>
        {product.images?.length === 0 && (
          <EmptyIcon>
            <ImageSquare size={32} />
          </EmptyIcon>
        )}
        <ProductFigureContent ref={sliderRef}>
          {images &&
            images.map((image, idx) => (
              <Image
                key={image.id}
                style={{
                  opacity: images.length > 0 ? opacities[idx] : 1,
                }}
                src={image.picture_url}
                layout="fill"
                objectFit="contain"
                alt={product.name}
              />
            ))}

          {loaded && instanceRef.current && (
            <Dots>
              {Array.from(
                Array(instanceRef.current.track.details.slides.length).keys(),
              ).map((idx) => {
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      instanceRef.current?.moveToIdx(idx)
                    }}
                    className={'dot' + (currentSlide === idx ? ' active' : '')}
                  ></button>
                )
              })}
            </Dots>
          )}
        </ProductFigureContent>
      </ProductFigure>

      <ProductDescriptions isPromotion={isPromotion}>
        <div>
          <ProductActions>
            <WishProduct productId={product.id} />
            <AddProduct product={product} />
          </ProductActions>

          <StarsWrapper>
            <BtnStarComment onClick={handleStarComment}>
              <FaStar size={16} />
              <FaStar size={16} />
              <FaStar size={16} />
              <FaStar size={16} />
              <FaStarHalfAlt size={16} />
            </BtnStarComment>
          </StarsWrapper>

          <Link href={`/products/${product.slug}/${product.id}`}>
            <TextCrop>
              <Text>{product.name}</Text>
            </TextCrop>
          </Link>
          <PriceWrapper>
            {product.price !== null && (
              <Price size="md" as="strong" isPromotion={isPromotion}>
                {isPromotion && <Lightning size={18} />}
                {formatValue(price)}
              </Price>
            )}
            {product.old_price && (
              <OldPrice size="md" as="span">
                {formatValue(product.old_price)}
              </OldPrice>
            )}
          </PriceWrapper>

          {isTimeDiscount && (
            <TimeDiscountTag>
              <CircleFlash>
                <Lightning size={30} />
              </CircleFlash>
              <Text size="lg">{`${days}d ${hours}h ${minutes}m ${seconds}s`}</Text>
            </TimeDiscountTag>
          )}
        </div>
      </ProductDescriptions>
    </ProductEmphasisContainer>
  )
}
