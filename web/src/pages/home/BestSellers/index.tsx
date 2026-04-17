import { useEffect, useState } from 'react'
import { Container, Row } from 'react-bootstrap'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { useGetAllProducts } from '@/hooks/useGetAllProducts'
import ArrowSlider from '@/components/ArrowSlider'
import { Heading, Text } from '@lemonade-technologies-hub-ui/react'

import Skeleton from 'react-loading-skeleton'
import ProductBox from '@/components/ProductBox'

import {
  ArrowsBox,
  BestSellersContainer,
  BestSellersContent,
  Loading,
} from './styles'

export default function BestSellers() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
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
    },
    'bestSeller',
  )

  useEffect(() => {
    setTimeout(() => {
      getAllProducts()
    }, 400)
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

  // useEffect(() => {
  //   if (services && products) {
  //     const newItems = [
  //       ...services.map((s) => ({ id: s.id, type: 'services' })),
  //       ...products.map((p) => ({ id: p.id, type: 'products' })),
  //     ] as ItemsDTO[]

  //     const random = shuffle(newItems)

  //     setItems(random)
  //   }
  // }, [services, products])

  return (
    <BestSellersContainer>
      <Container>
        <Row>
          <BestSellersContent>
            <div>
              <Heading as="h2">Mais vendidos</Heading>
            </div>

            <div>
              {loaded && instanceRef.current && products && products.length > 0 && (
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
              {(!products || products.length === 0) && !isLoading ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', minHeight: '200px' }}>
                  <Text size="lg" as="strong">Produto não cadastrado</Text>
                </div>
              ) : (
                <>
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
                        </div>
                      )}
                    </>
                  )}
                </>
              )}
            </div>

          </BestSellersContent>
        </Row>
      </Container>
    </BestSellersContainer>
  )
}
