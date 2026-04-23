import { Heading, Text } from '@lemonade-technologies-hub-ui/react'
import 'keen-slider/keen-slider.min.css'
import { FaStar, FaStarHalfAlt } from 'react-icons/fa'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import formatValue from '@/utils/formatValue'
import Link from 'next/link'
import { ImageSquare, Lightning } from 'phosphor-react'
import { IProductDTO } from '@/pages/dtos/product.dto'
import WishProduct from './WishProduct'
import AddProduct from './AddProduct'
import { GridMode } from '../DisplayModesProducts'
import TimeDiscount from './TimeDiscount'
import discountPrice from './discountPrice'

import {
  BtnStarComment,
  EmptyIcon,
  OldPrice,
  Price,
  PriceWrapper,
  ProductActions,
  ProductBoxContainer,
  ProductDescriptions,
  ProductFigure,
  ProductFigureContent,
  StarsWrapper,
  TextCrop,
  TextCropDescription,
} from './styles'

interface ItemProps {
  product: IProductDTO
  size?: 'sm' | 'xs'
  orientation?: 'y' | 'x'
  mode?: GridMode
  discountOff?: boolean
}

export default function ProductBox({
  product,
  size,
  mode,
  orientation,
  discountOff,
}: ItemProps) {
  const [hasTimeDiscount, setHasTimeDiscount] = useState(false)

  const isList = mode !== 'grid'

  const isSmall = size === 'sm'
  const isUltraSmall = size === 'xs'

  function handleStarComment() {
    // console.log('chegouu1231')
  }

  useEffect(() => {
    setHasTimeDiscount(!!product.time_discount)
  }, [product.time_discount])

  // useEffect(() => {
  //   if (mode) {
  //     const orientation = size === 'sm' || isList ? 'x' : 'y'
  //     const dateNow = product.time_discount ? new Date() : undefined

  //     const time = getDaysBetweenDates(
  //       dateNow,
  //       product.time_discount?.endDate,
  //       orientation,
  //     )

  //     setTimer(time)
  //   }
  // }, [mode])

  const productType = [product.type, 's'].join('')

  const images = product.images?.slice(0, 2)

  const isProduct = product.type === 'product'

  const isPromotion = !!product.time_discount

  const price = discountPrice(
    product.price,
    product.time_discount?.discount ?? 0,
  )

  return (
    <ProductBoxContainer
      mode={mode}
      size={size}
      orientation={orientation}
      isPromotion={isPromotion}
    >
      {!isUltraSmall && (
        <ProductActions size={size}>
          <WishProduct productId={product.id} size={size} />

          {isProduct && <AddProduct product={product} size={size} />}

          {size !== 'sm' && !isList && hasTimeDiscount && (
            <TimeDiscount
              size={size}
              deadline={product.time_discount?.endDate.toString() ?? ''}
              timeY={true}
            />
          )}
        </ProductActions>
      )}

      <ProductFigure size={size}>
        {product.images?.length === 0 && (
          <EmptyIcon>
            <ImageSquare size={32} />
          </EmptyIcon>
        )}
        {images && (
          <ProductFigureContent>
            <Image
              src={images[0]?.picture_url}
              layout="fill"
              objectFit={isProduct ? 'contain' : 'cover'}
              alt={product.name}
            />
          </ProductFigureContent>
        )}
      </ProductFigure>

      <ProductDescriptions size={size}>
        <div>
          {!isSmall && !isUltraSmall && (
            <StarsWrapper>
              <BtnStarComment onClick={handleStarComment}>
                <FaStar size={16} />
                <FaStar size={16} />
                <FaStar size={16} />
                <FaStar size={16} />
                <FaStarHalfAlt size={16} />
              </BtnStarComment>
            </StarsWrapper>
          )}

          <Link href={`/${productType}/${product.slug}/${product.id}`}>
            <TextCrop orientation={orientation} mode={mode ?? 'list'}>
              <Heading as="h2">{product.name}</Heading>
            </TextCrop>

            {mode === 'list' && (
              <TextCropDescription orientation={orientation}>
                {product.description && (
                  <Text
                    className="content"
                    dangerouslySetInnerHTML={{
                      __html: product.description,
                    }}
                  />
                )}
              </TextCropDescription>
            )}
          </Link>

          {isSmall && (
            <StarsWrapper>
              <BtnStarComment onClick={handleStarComment}>
                <FaStar size={16} />
                <FaStar size={16} />
                <FaStar size={16} />
                <FaStar size={16} />
                <FaStarHalfAlt size={16} />
              </BtnStarComment>
            </StarsWrapper>
          )}

          <PriceWrapper orientation={orientation}>
            {product.price !== null && (
              <Price as="strong" isPromotion={isPromotion}>
                {isPromotion && <Lightning size={18} />}
                {formatValue(price)}
              </Price>
            )}

            {product.old_price && (
              <OldPrice as="span">
                {formatValue(product.old_price ?? 0)}
              </OldPrice>
            )}
          </PriceWrapper>

          {!discountOff && (
            <>
              {(size === 'sm' || isList) && hasTimeDiscount && (
                <TimeDiscount
                  size={size}
                  deadline={product.time_discount?.endDate.toString() ?? ''}
                  timeY={false}
                />
              )}
            </>
          )}
        </div>
      </ProductDescriptions>
    </ProductBoxContainer>
  )
}
