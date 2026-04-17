import { Container, Row } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'
import { FreeMode, Pagination } from 'swiper/modules'
import ProductBox from '@/components/ProductBox'
import { Heading } from '@lemonade-technologies-hub-ui/react'
import Skeleton from 'react-loading-skeleton'
import groupBlocksProducts from '@/pages/utils/groupBlocksProducts'
import { IProductDTO } from '@/pages/dtos/product.dto'
import { useGetAllProducts } from '@/hooks/useGetAllProducts'
import { useGetAllCategories } from '@/hooks/useGetAllCategories'

import {
  BtnCategory,
  CategoriesLabels,
  Hr,
  Loading,
  ProductContentBox,
  TopCategoriesContainer,
  TopCategoriesHeader,
} from './styles'

export default function TopCategories() {
  const [categoryTargetId, setCategoryTargetId] = useState('')
  const [groups, setGroups] = useState<IProductDTO[][]>([])

  const { data: categoriesData, refetch: getAllCategories } =
    useGetAllCategories({
      limit: 99999,
      page: 1,
    })

  useEffect(() => {
    getAllCategories()
  }, [getAllCategories])

  const {
    isLoading: productsLoading,
    data: productsData,
    refetch: getProducts,
  } = useGetAllProducts(
    {
      options: {
        limit: 50,
        page: 1,
      },
      categoryId: categoryTargetId,
    },
    'top-categories',
  )

  useEffect(() => {
    getProducts()
  }, [getProducts, categoryTargetId])

  const [products] = productsData ?? []

  useEffect(() => {
    if (products) {
      const productsBlocks = groupBlocksProducts(products, 6)
      setGroups(productsBlocks)
    }
  }, [products])

  const topThenCategories = categoriesData && categoriesData[0].slice(0, 10)

  function handleTopCategory(id: string) {
    setCategoryTargetId(id === 'null' ? '' : id)
  }

  return (
    <TopCategoriesContainer>
      <Container>
        <Row>
          <TopCategoriesHeader>
            <div>
              <Heading as="h2">Top 10 categorias</Heading>

              <Hr />

              <CategoriesLabels>
                <div>
                  <BtnCategory
                    size="xs"
                    onClick={() => handleTopCategory('null')}
                  >
                    Todos
                  </BtnCategory>
                </div>
                {topThenCategories?.map((category) => (
                  <div key={category.id}>
                    <BtnCategory
                      size="xs"
                      onClick={() => handleTopCategory(category.id)}
                    >
                      {category.name}
                    </BtnCategory>
                  </div>
                ))}
              </CategoriesLabels>
            </div>
          </TopCategoriesHeader>

          <div>
            {productsLoading ? (
              <Loading>
                <div>
                  <Skeleton count={1} height={253} borderRadius={8} />
                  <Skeleton count={1} height={253} borderRadius={8} />
                </div>
                <div>
                  <Skeleton count={1} height={253} borderRadius={8} />
                  <Skeleton count={1} height={253} borderRadius={8} />
                </div>
                <div>
                  <Skeleton count={1} height={253} borderRadius={8} />
                  <Skeleton count={1} height={253} borderRadius={8} />
                </div>
              </Loading>
            ) : (
              <>
                {groups.length > 0 && (
                  <Swiper
                    slidesPerView={'auto'}
                    spaceBetween={30}
                    freeMode={true}
                    pagination={{
                      clickable: true,
                    }}
                    modules={[FreeMode, Pagination]}
                    className="mySwiper"
                    style={{ paddingBottom: 60 }}
                  >
                    {groups.map((group, index) => (
                      <SwiperSlide key={index}>
                        <ProductContentBox>
                          {group.map((product) => (
                            <ProductBox
                              key={product.id}
                              product={product}
                              size="sm"
                            />
                          ))}
                        </ProductContentBox>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                )}
              </>
            )}
          </div>
        </Row>
      </Container>
    </TopCategoriesContainer>
  )
}
