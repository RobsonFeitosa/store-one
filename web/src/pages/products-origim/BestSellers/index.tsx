import { useKeenSlider } from 'keen-slider/react'
import { useEffect, useState } from 'react'
import { useGetAllBestSellers } from './useGetAllBestSellers'
import ProductBox from '@/components/ProductBox'
import { Heading } from '@lemonade-technologies-hub-ui/react'
import ArrowSingle from './ArrowSingle'
import Skeleton from 'react-loading-skeleton'
import { IProductDTO } from '@/pages/dtos/product.dto'
import groupBlocksProducts from '../../utils/groupBlocksProducts'

import {
  ArrowsBox,
  BestSellerContent,
  BestSellersContainer,
  HeaderWrapper,
  Loading,
  ProductContentBox,
} from './styles'

export default function BestSellers() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)

  const {
    isLoading,
    data: productsData,
    refetch: getProductsBestSeller,
  } = useGetAllBestSellers({
    options: {
      limit: 9999,
      page: 1,
    },
  })

  useEffect(() => {
    getProductsBestSeller()
  }, [getProductsBestSeller])

  const [ref, instanceRef] = useKeenSlider<HTMLDivElement>({
    renderMode: 'performance',
    slideChanged(s) {
      setCurrentSlide(s.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
    slides: {
      perView: 1,
      spacing: 30,
    },
  })

  const [products] = productsData ?? []

  const [groups, setGroups] = useState<IProductDTO[][]>([])

  useEffect(() => {
    if (products) {
      const productsBlocks = groupBlocksProducts(products, 3)
      setGroups(productsBlocks)
    }
  }, [products])

  return (
    <BestSellersContainer>
      <HeaderWrapper>
        <Heading as="h3">Mais vendidos</Heading>

        <div>
          {loaded && instanceRef.current && (
            <ArrowsBox>
              <ArrowSingle
                left
                onClick={(e: any) =>
                  e.stopPropagation() || instanceRef.current?.prev()
                }
                disabled={currentSlide === 0}
              />

              <ArrowSingle
                onClick={(e: any) =>
                  e.stopPropagation() || instanceRef.current?.next()
                }
                disabled={
                  currentSlide ===
                  instanceRef.current.track.details?.slides?.length - 1
                }
              />
            </ArrowsBox>
          )}
        </div>
      </HeaderWrapper>

      <BestSellerContent>
        {isLoading ? (
          <Loading>
            <div>
              <Skeleton count={1} height={100} borderRadius={8} />
            </div>
            <div>
              <Skeleton count={1} height={100} borderRadius={8} />
            </div>
            <div>
              <Skeleton count={1} height={100} borderRadius={8} />
            </div>
          </Loading>
        ) : (
          <>
            {groups.length > 0 && (
              <div ref={ref} className="keen-slider">
                {groups?.map((group, index) => (
                  <div
                    key={group[index]?.id}
                    className={`keen-slider__slide number-slide${group[index]?.id}`}
                  >
                    <ProductContentBox>
                      {group.map((product) => (
                        <ProductBox
                          key={product.id}
                          product={product}
                          discountOff
                          size="xs"
                          orientation="x"
                        />
                      ))}
                    </ProductContentBox>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </BestSellerContent>
    </BestSellersContainer>
  )
}
