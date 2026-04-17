import DashboardLayout from '@/components/components/Layout/Dashboard'
import { Heading } from '@lemonade-technologies-hub-ui/react'
import { Col, Container, Row } from 'react-bootstrap'
import { useGetOrders } from './useGetOrders'
import { useEffect, useState } from 'react'
import OrderSingle from './OrderSingle'
import Pagination from '@/components/Pagination'

import { OrderHeader, OrdersContainer, OrdersContent } from './styles'
import { useAuth } from '@/hooks/providers/auth'

const itemsPerPage = 6

export default function Orders() {
  const { user } = useAuth()
  const [currentPage, setCurrentPage] = useState(1)
  const { data: ordersData, refetch: getOrders } = useGetOrders(
    {
      limit: itemsPerPage,
      page: currentPage,
    },
    'dashboard-orders',
  )

  useEffect(() => {
    user && getOrders()
  }, [currentPage, getOrders, user])

  const [orders, total] = ordersData ?? []

  function handlePageChange(page: number) {
    setCurrentPage(page)
  }

  return (
    <DashboardLayout>
      <OrdersContainer>
        <Container>
          <OrderHeader>
            <Heading as="h4">Pedidos ({total})</Heading>
          </OrderHeader>

          <OrdersContent>
            <Row>
              {orders?.map((order) => (
                <Col key={order.id} xs="6" sm="6" md="6" lg="6">
                  <OrderSingle order={order} />
                </Col>
              ))}
            </Row>
            <Row>
              <Pagination
                currentPage={currentPage}
                totalPages={total ? Math.ceil(total / itemsPerPage) : 0}
                onPageChange={handlePageChange}
              />
            </Row>
          </OrdersContent>
        </Container>
      </OrdersContainer>
    </DashboardLayout>
  )
}
