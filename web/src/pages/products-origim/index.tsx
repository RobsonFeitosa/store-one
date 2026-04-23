/* eslint-disable @typescript-eslint/no-unused-vars */
import { Col, Container, Row } from 'react-bootstrap'
import { useGetAllProducts } from '@/hooks/useGetAllProducts'
import { useEffect, useState } from 'react'
import { IProductDTO } from '@/pages/dtos/product.dto'
import { PaintBrushHousehold } from 'phosphor-react'
import appleImage from '@/assets/apple.png'
import { z } from 'zod'
import MainLayout from '@/components/components/Layout/Main'
import Pagination from '@/components/Pagination'
import { Heading, Slider, Text } from '@lemonade-technologies-hub-ui/react'
import Link from 'next/link'
import formatValue from '@/utils/formatValue'
import Colors from './Colors'
import Sizes from './Sizes'
import BestSellers from './BestSellers'
import Image from 'next/image'
import DisplayModesProducts, {
  GridMode,
} from '@/components/DisplayModesProducts'
import Skeleton from 'react-loading-skeleton'
import ProductBox from '@/components/ProductBox'
import { useRouter } from 'next/router'
import { useGetAllCategories } from '@/hooks/useGetAllCategories'

import {
  BannerWrapper,
  BestSellerWrapper,
  BtnClean,
  Categories,
  CategoriesContent,
  CategoryLi,
  ColorsWrapper,
  FilterHeader,
  FilterWrapper,
  HeaderWrapper,
  Loading,
  Price,
  PriceContent,
  PriceWrapper,
  ProductsContainer,
  ProductWrapper,
  Size,
} from './styles'

const itemsPerPage = 9
const maxSlider = 12500

const filterForm = z.object({
  price: z.number(),
  colors: z.array(z.string()),
})

export type FilterFormData = z.infer<typeof filterForm>

type Products = [IProductDTO[], number]
interface ProductsOrigimProps {
  isProduct: boolean
  productsInital: [IProductDTO[], number]
}

export default function ProductsOrigim({
  isProduct = true,
  productsInital,
}: ProductsOrigimProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [productsData, setProductsData] = useState<Products>(productsInital)

  const router = useRouter()

  const size = router.query.size ? String(router.query.size) : undefined
  const color = router.query.color ? String(router.query.color) : undefined
  const categoryId = router.query.categoryId
    ? String(router.query.categoryId)
    : undefined
  const priceMin = router.query.priceMin ? Number(router.query.priceMin) : 0
  const priceMax = router.query.priceMax
    ? Number(router.query.priceMax)
    : maxSlider

  const {
    isLoading,
    data: dataProducts,
    refetch: getProducts,
  } = useGetAllProducts({
    type: isProduct ? 'product' : 'service',
    options: {
      limit: itemsPerPage,
      page: currentPage,
    },
    ...router.query,
  })

  useEffect(() => {
    getProducts()
  }, [currentPage, router.query, getProducts])

  console.log({ dataProducts })
  useEffect(() => {
    if (dataProducts) {
      setProductsData(dataProducts)
    }

    return () => {
      setProductsData([[], 0])
    }
  }, [dataProducts])

  function handlePageChange(page: number) {
    setCurrentPage(page)
  }

  function handleSlider(value: number[]) {
    router.push({
      ...router,
      query: {
        ...router.query,
        priceMin: value[0],
        priceMax: value[1],
      },
    })
  }

  const [products, total] = [[], 0]

  const [mode, setMode] = useState<GridMode>('grid')

  function onModeProducts(mode: GridMode) {
    setMode(mode)
  }

  const isList = mode !== 'grid'

  const { data: categoriesData, refetch: getAllCategories } =
    useGetAllCategories(
      {
        limit: 99999,
        page: 1,
      },
      isProduct ? 'product' : 'service',
    )

  useEffect(() => {
    getAllCategories()
  }, [getAllCategories, isProduct])

  const [categoriesRes] = categoriesData ?? []

  const [sliderInitial, _] = useState<number[]>(() => [priceMin, priceMax])

  function handleCategory(categoryId: string) {
    router.push({
      ...router,
      query: {
        ...router.query,
        categoryId,
      },
    })
  }

  function handleRemoveColor() {
    delete router.query.color

    router.push({
      ...router,
    })
  }

  function handleRemoveSize() {
    delete router.query.size

    router.push({
      ...router,
    })
  }

  return (
    <MainLayout title={isProduct ? 'Produtos' : 'Serviços'}>
      <Container>
        <ProductsContainer>
          <Row>
            <Col xs="12" sm="12" md="12" lg="3">
              <FilterWrapper>
                <Categories>
                  <FilterHeader>
                    <Heading as="h3">Categorias</Heading>
                  </FilterHeader>
                  <CategoriesContent>
                    <ul>
                      <CategoryLi>
                        <Link href={isProduct ? '/products' : '/services'}>
                          <Text as="span">Todos</Text>
                        </Link>
                      </CategoryLi>
                      {categoriesRes?.map((category) => (
                        <CategoryLi
                          key={category.id}
                          actived={categoryId === category.id}
                        >
                          <button onClick={() => handleCategory(category.id)}>
                            <Text as="span">{category.name}</Text>
                          </button>
                        </CategoryLi>
                      ))}
                    </ul>
                  </CategoriesContent>
                </Categories>
                <Price>
                  <FilterHeader>
                    <Heading as="h3">Preço</Heading>
                  </FilterHeader>
                  <PriceContent>
                    <Slider
                      max={maxSlider}
                      step={2}
                      onValueCommit={handleSlider}
                      defaultValue={sliderInitial}
                      hasFullOut={true}
                    />

                    <PriceWrapper>
                      <Text>{formatValue(priceMin)}</Text>
                      <Text>{formatValue(priceMax)}</Text>
                    </PriceWrapper>
                  </PriceContent>
                </Price>
                {isProduct && (
                  <>
                    <ColorsWrapper>
                      <FilterHeader>
                        <Heading as="h3">Cores</Heading>

                        {!!color && (
                          <BtnClean onClick={handleRemoveColor}>
                            <PaintBrushHousehold size={18} />
                          </BtnClean>
                        )}
                      </FilterHeader>
                      <Colors />
                    </ColorsWrapper>
                    <Size>
                      <FilterHeader>
                        <Heading as="h3">Tamanho</Heading>

                        {!!size && (
                          <BtnClean onClick={handleRemoveSize}>
                            <PaintBrushHousehold size={18} />
                          </BtnClean>
                        )}
                      </FilterHeader>
                      <Sizes />
                    </Size>
                  </>
                )}
              </FilterWrapper>

              <BestSellerWrapper>
                <BestSellers />
              </BestSellerWrapper>

              <BannerWrapper>
                <Image src={appleImage} width={300} height={500} alt="sf" />
              </BannerWrapper>
            </Col>
            <Col xs="12" sm="12" md="12" lg="9">
              <Row>
                <Col xs="12" sm="12" md="12" lg="12">
                  <HeaderWrapper>
                    <Heading as="h2">
                      {isProduct ? 'Produtos' : 'Serviços'}
                    </Heading>

                    <Text>
                      Dispositivos elétricos há necessidade de sistema de
                      controle central de onde os dispositivos podem ser ligados
                      ou desligados. Uma central servidor de onde cada
                      dispositivo pode ser controlado é A melhor opção. Neste
                      projeto vamos fazer um simples servidor web usando O
                      servidor será usado para fornecer web página, onde
                      criaremos 4 botões para ligar e desligar dois relés
                      conectados à placa Arduino MKR.
                    </Text>

                    <DisplayModesProducts
                      mode={mode}
                      total={total ?? 0}
                      onMode={onModeProducts}
                      isProduct={isProduct}
                    />
                  </HeaderWrapper>
                </Col>
              </Row>
              <Row>
                {isLoading ? (
                  <Loading isList={isList}>
                    <div>
                      <Skeleton
                        count={1}
                        height={isList ? 200 : 403}
                        borderRadius={8}
                      />
                      <Skeleton
                        count={1}
                        height={isList ? 200 : 403}
                        borderRadius={8}
                      />
                      <Skeleton
                        count={1}
                        height={isList ? 200 : 403}
                        borderRadius={8}
                      />
                    </div>
                    {!isList && (
                      <>
                        <div>
                          <Skeleton
                            count={1}
                            height={isList ? 200 : 403}
                            borderRadius={8}
                          />
                          <Skeleton
                            count={1}
                            height={isList ? 200 : 403}
                            borderRadius={8}
                          />
                          <Skeleton
                            count={1}
                            height={isList ? 200 : 403}
                            borderRadius={8}
                          />
                        </div>
                        <div>
                          <Skeleton
                            count={1}
                            height={isList ? 200 : 403}
                            borderRadius={8}
                          />
                          <Skeleton
                            count={1}
                            height={isList ? 200 : 403}
                            borderRadius={8}
                          />
                          <Skeleton
                            count={1}
                            height={isList ? 200 : 403}
                            borderRadius={8}
                          />
                        </div>
                      </>
                    )}
                  </Loading>
                ) : (
                  <>
                    {products && products?.length > 0 ? (
                      products?.map((product: IProductDTO) => (
                        <Col
                          xs="12"
                          sm="12"
                          md="6"
                          lg={isList ? '12' : '4'}
                          key={product.id}
                        >
                          <ProductWrapper>
                            <ProductBox mode={mode} product={product} />
                          </ProductWrapper>
                        </Col>
                      ))
                    ) : (
                      <div>
                        <Text>Nenhum produto encontrado</Text>
                      </div>
                    )}
                  </>
                )}
              </Row>
              <Row>
                <Pagination
                  currentPage={currentPage}
                  totalPages={total ? Math.ceil(total / itemsPerPage) : 0}
                  onPageChange={handlePageChange}
                />
              </Row>
            </Col>
          </Row>
        </ProductsContainer>
      </Container>
    </MainLayout>
  )
}
