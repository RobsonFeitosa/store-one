import { ArrowsBox, Loading, ProductsRelatedContainer, ViewAll } from './styles'
import { useEffect, useState } from 'react'
import ProductBox from '@/components/ProductBox'
import { Container, Row } from 'react-bootstrap'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import ArrowSlider from '@/components/ArrowSlider'
import Link from 'next/link'
import { ProductCarouselContent } from '@/pages/home/ProductsCarousel/styles'
import Skeleton from 'react-loading-skeleton'
import { useGetAllProducts } from '@/hooks/useGetAllProducts'

export default function ProductsRelated() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)

  // TODO: Pega pelo tipo produto/servico para uma pesquisa relacionada a tags
  const {
    isLoading,
    data: productsData,
    refetch: getAllProducts,
  } = useGetAllProducts(
    {
      options: {
        limit: 9999,
        page: 1,
      },
      type: 'product',
      timeDiscountPriory: true,
    },
    'related',
  )

  useEffect(() => {
    getAllProducts()
  }, [getAllProducts])

  const [products] = productsData ?? []

  const [ref, instanceRef] = useKeenSlider<HTMLDivElement>({
    slideChanged(s) {
      setCurrentSlide(s.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
    slides: {
      perView: 4,
      spacing: 30,
    },
    breakpoints: {
      '(max-width: 1300px)': {
        slides: {
          perView: 3,
          spacing: 30,
        },
      },
      '(max-width: 1000px)': {
        slides: {
          perView: 2,
          spacing: 30,
        },
      },
      '(max-width: 600px)': {
        slides: {
          perView: 1,
          spacing: 30,
        },
      },
    },
  })

  return (
    <ProductsRelatedContainer>
      <Container>
        <Row>
          <ProductCarouselContent>
            <div>
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
                      instanceRef.current.track.details?.slides?.length - 4
                    }
                  />
                </ArrowsBox>
              )}
            </div>
            <div>
              {isLoading ? (
                <Loading>
                  <div>
                    <Skeleton count={1} height={403} borderRadius={8} />
                  </div>
                  <div>
                    <Skeleton count={1} height={403} borderRadius={8} />
                  </div>
                  <div>
                    <Skeleton count={1} height={403} borderRadius={8} />
                  </div>
                  <div>
                    <Skeleton count={1} height={403} borderRadius={8} />
                  </div>
                </Loading>
              ) : (
                <>
                  {products && (
                    <div ref={ref} className="keen-slider">
                      {products?.map((product, index) => (
                        <div
                          key={product.id}
                          className={`keen-slider__slide number-slide${index}`}
                        >
                          <ProductBox product={product} mode="grid" />
                        </div>
                      ))}
                      <div className={`keen-slider__slide number-slide999`}>
                        <ViewAll>
                          <Link href="/products">VER TODOS</Link>
                        </ViewAll>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </ProductCarouselContent>
        </Row>
      </Container>
    </ProductsRelatedContainer>
  )
}
