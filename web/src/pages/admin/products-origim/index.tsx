import AdminLayout from '@/components/components/Layout/Admin'
import { Col, Row } from 'react-bootstrap'
import Pagination from '@/components/Pagination'
import { useEffect, useState } from 'react'
import { useGetAllProducts } from '../hooks_generic/useGetAllProducts'
import ProductsContent from './ProductsContent'
import { useRouter } from 'next/router'
import { DiamondsFour } from 'phosphor-react'
import DisplayModesProducts from '@/components/DisplayModesProductsAdmin'
import { useSettings } from '@/hooks/providers/settings'
import { TypeProduct } from '@/pages/admin/dtos/product.dto'
import ServicesContent from './ServicesContent'
import { Loading } from '@/components/Loading'
import EmptyLabel from '@/components/EmptyLabel'

import {
  BtnDisplayOpen,
  ContentWrapper,
  DisplaySwitch,
  ProductsContainer,
} from './styles'

const itemsPerPage = 12

interface QueriesProductsProps {
  name?: string
  quantity?: number
  weight?: number
  priceMin?: number
  priceMax?: number
  type?: TypeProduct
}

export default function ProductsOrigim() {
  const { isTopContent } = useSettings()
  const [currentPage, setCurrentPage] = useState(1)

  const [queries, setQueries] = useState<QueriesProductsProps | null>(null)

  const router = useRouter()

  const [type, setType] = useState<TypeProduct>(() => {
    const hasType = router.pathname?.includes('products')
      ? 'product'
      : 'service'

    return hasType
  })

  useEffect(() => {
    const hasType = router.pathname?.includes('products')
      ? 'product'
      : 'service'

    setType(hasType)
  }, [router])

  const name = router.query.name ? String(router.query.name) : undefined
  const quantity = router.query.quantity
    ? Number(router.query.quantity)
    : undefined
  const weight = router.query.weight ? Number(router.query.weight) : undefined
  const priceMin = router.query.priceMin
    ? Number(router.query.priceMin)
    : undefined
  const priceMax = router.query.priceMax
    ? Number(router.query.priceMax)
    : undefined

  const { isLoading, data: productsData } = useGetAllProducts({
    options: {
      limit: itemsPerPage,
      page: currentPage,
    },
    ...queries,
  })

  const [products, total] = productsData ?? []

  function handlePageChange(page: number) {
    setCurrentPage(page)
  }

  // useEffect(() => {
  //   setQueries({
  //     name,
  //     quantity,
  //     weight,
  //     priceMin,
  //     priceMax,
  //     type: type ?? 'product',
  //   })
  // }, [name, quantity, weight, type, priceMax, priceMin])

  const [onDisplay, setOnDisplay] = useState(false)

  function handleShowDisplay() {
    setOnDisplay(!onDisplay)
  }

  const label = type === 'product' ? 'produto' : 'serviço'

  return (
    <AdminLayout>
      <ProductsContainer>
        <Row>
          <Col md={12} lg={12}>

            <BtnDisplayOpen onClick={handleShowDisplay} isActived={onDisplay}>
              <DiamondsFour size={30} />
            </BtnDisplayOpen>

            <DisplaySwitch isActived={onDisplay}>
              <DisplayModesProducts total={total ?? 0} type={type} />
            </DisplaySwitch>

            <ContentWrapper isTopContent={isTopContent && onDisplay}>
              {isLoading ? (
                <Loading />
              ) : (
                <>
                  <div>
                    {products && products.length > 0 ? (
                      <>
                        {type === 'product' ? (
                          <ProductsContent products={products} />
                        ) : (
                          <ServicesContent products={products} />
                        )}
                      </>
                    ) : (
                      <EmptyLabel label={label} />
                    )}
                  </div>

                  <div>
                    <Pagination
                      currentPage={currentPage}
                      totalPages={total ? Math.ceil(total / itemsPerPage) : 0}
                      onPageChange={handlePageChange}
                    />
                  </div>
                </>
              )}
            </ContentWrapper>
          </Col>
        </Row>
      </ProductsContainer>
    </AdminLayout>
  )
}


