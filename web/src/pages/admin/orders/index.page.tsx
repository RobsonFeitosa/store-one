/* eslint-disable react-hooks/exhaustive-deps */
import AdminLayout from '@/components/components/Layout/Admin'
import { useGetAllOrders } from '../hooks_generic/useGetAllOrders'
import { useEffect, useState } from 'react'
import Pagination from '@/components/Pagination'
import { Dialog, DialogRoot } from '@lemonade-technologies-hub-ui/react'
import Edit from './Edit'
import { IOrderDTO } from '@/pages/admin/dtos/orders.dto'
import Order from './Order'
import { Loading } from '@/components/Loading'
import EmptyLabel from '@/components/EmptyLabel'
import { useAuth } from '@/hooks/providers/auth'
import { Col, Row } from 'react-bootstrap'

import { OrdersContainer } from './styles'

const itemsPerPage = 12

export default function Orders() {
  const [currentPage, setCurrentPage] = useState(1)
  const [openModalEdit, setOpenModalEdit] = useState(false)
  const [orderId, setOrderId] = useState('')
  const [orders, setOrders] = useState<IOrderDTO[]>([])
  const { user } = useAuth()

  const {
    isLoading,
    data: dataOrders,
    refetch: getAllOrders,
  } = useGetAllOrders({
    limit: itemsPerPage,
    page: currentPage,
  })

  const [, total] = dataOrders ?? []

  function handlePageChange(page: number) {
    setCurrentPage(page)
  }

  useEffect(() => {
    user && getAllOrders()
  }, [user, currentPage, getAllOrders])

  useEffect(() => {
    if (dataOrders) {
      setOrders(dataOrders[0])
    }
  }, [dataOrders])

  function handleEditOrder(orderId: string) {
    setOrderId(orderId)
    setOpenModalEdit(true)
  }

  return (
    <>
      <DialogRoot open={openModalEdit}>
        <Dialog offClosed title="">
          <Edit
            orderId={orderId}
            optionsPage={{ limit: itemsPerPage, page: currentPage }}
            onClose={() => setOpenModalEdit(false)}
          />
        </Dialog>
      </DialogRoot>

      <AdminLayout>
        <OrdersContainer>
          <Row>
            {isLoading ? (
              <Loading />
            ) : (
              <>
                {orders && orders?.length > 0 ? (
                  orders?.map((order) => (
                    <Col md={4} lg={4} key={order.id}>
                      <Order order={order} onEditOrderId={handleEditOrder} />
                    </Col>
                  ))
                ) : (
                  <EmptyLabel label="pedido" />
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
        </OrdersContainer>
      </AdminLayout>
    </>
  )
}
