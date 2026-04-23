import {
  ArrowsBox,
  BtnViewMore,
  CarouselContent,
  Loading,
  ServiceContent,
  ServicesCarouselContainer,
} from './styles'
import { useEffect, useState } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import { Heading, Text } from '@lemonade-technologies-hub-ui/react'
import ArrowSlider from '@/components/ArrowSlider'
import ProductBox from '@/components/ProductBox'
import { useGetAllServices } from './useGetAllServices'
import { useRouter } from 'next/router'
import Skeleton from 'react-loading-skeleton'

export default function ServicesCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const {
    isSuccess,
    isLoading,
    data: servicesData,
    refetch: getServices,
  } = useGetAllServices({ options: { limit: 12, page: 1 } })

  useEffect(() => {
    getServices()
  }, [isSuccess, getServices])

  const [services] = servicesData ?? []

  const [ref, instanceRef] = useKeenSlider<HTMLDivElement>({
    renderMode: 'performance',
    slideChanged(s) {
      setCurrentSlide(s.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
    slides: {
      perView: 3,
      spacing: 30,
    },
    breakpoints: {
      '(max-width: 1300px)': {
        slides: {
          perView: 2,
          spacing: 30,
        },
      },
      '(max-width: 900px)': {
        slides: {
          perView: 1,
          spacing: 30,
        },
      },
    },
  })

  const router = useRouter()

  function handleMoreServices() {
    router.push('/services')
  }

  return (
    <ServicesCarouselContainer>
      <CarouselContent>
        <div>
          {(!services || services.length === 0) && !isLoading ? (
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
                </Loading>
              ) : (
                <>
                  {services && (
                    <div ref={ref} className="keen-slider">
                      {services?.map((service, index) => (
                        <div
                          key={service.id}
                          className={`keen-slider__slide number-slide${index}`}
                        >
                          <ProductBox product={service} mode="grid" />
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>

      </CarouselContent>
      <ServiceContent>
        <div>
          {loaded && instanceRef.current && services && services.length > 0 && (
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
                  instanceRef.current.track.details?.slides?.length - 3
                }
              />
            </ArrowsBox>
          )}
          <Heading as="h2">Serviços mais solicitados</Heading>
          <Text>
            Mais de 1200 serviços especializados em diversas atividades, todos
            disponíveis em uma única plataforma especialmente para você!
          </Text>

          <Text>
            Realize o agendamento de forma automática com o profissional de sua
            escolha. Não perca tempo! Agende e efetue o pagamento de maneira
            facilitada em apenas alguns cliques.
          </Text>

          <BtnViewMore onClick={handleMoreServices}>Ver mais</BtnViewMore>
        </div>
      </ServiceContent>
    </ServicesCarouselContainer>
  )
}
