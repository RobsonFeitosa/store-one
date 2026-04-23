import AdminLayout from '@/components/components/Layout/Admin'
import { Col, Row } from 'react-bootstrap'
import Pagination from '@/components/Pagination'
import { useEffect, useState } from 'react'
import { Dialog, DialogRoot } from '@lemonade-technologies-hub-ui/react'
import { useGetAllTimeDiscount } from '../hooks/useGetAllTimeDiscount'
import TimeDiscountContent from './TimeDiscountContent'
import FormTimeDiscount from './FormTimeDiscount'
import { useGetProductsTimeDiscountOptions } from '../hooks/useGetProductsTimeDiscountOptions'
import { Loading } from '@/components/Loading'
import EmptyLabel from '@/components/EmptyLabel'

import {
  BtnNewTimeDiscount,
  Empty,
  TimeDiscountContentContainer,
  TimeDiscountHeader,
} from './styles'
import { useAuth } from '@/hooks/providers/auth'

const itemsPerPage = 12

export default function TimeDiscounts() {
  const [currentPage, setCurrentPage] = useState(1)
  const [openModal, setOpenModal] = useState(false)
  const { user } = useAuth()

  const { data: optionsProductsData, refetch: getOptionsProductsTimeDiscount } =
    useGetProductsTimeDiscountOptions()

  const {
    isLoading,
    data: timeDiscountsData,
    refetch: getAllTimeDiscounts,
  } = useGetAllTimeDiscount({
    limit: itemsPerPage,
    page: currentPage,
  })

  const [timeDiscounts, total] = timeDiscountsData ?? []

  function handlePageChange(page: number) {
    setCurrentPage(page)
  }

  useEffect(() => {
    user && getAllTimeDiscounts()
  }, [user, currentPage, getAllTimeDiscounts])

  function handleNewTimeDiscount() {
    setOpenModal(true)
  }

  useEffect(() => {
    user && getOptionsProductsTimeDiscount()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  async function onRefetch() {
    await getAllTimeDiscounts()
    await getOptionsProductsTimeDiscount()
  }

  return (
    <>
      <DialogRoot open={openModal}>
        <Dialog offClosed title="Novo desconto temporal">
          <FormTimeDiscount
            optionsProducts={optionsProductsData}
            onClose={() => setOpenModal(false)}
            onRefetch={onRefetch}
          />
        </Dialog>
      </DialogRoot>
      <AdminLayout>
        {optionsProductsData?.length !== 0 && (
          <TimeDiscountHeader>
            <BtnNewTimeDiscount onClick={handleNewTimeDiscount}>
              Novo desconto temporal
            </BtnNewTimeDiscount>
          </TimeDiscountHeader>
        )}

        <TimeDiscountContentContainer>
          <Row>
            {isLoading ? (
              <Loading />
            ) : (
              <>
                {timeDiscounts && timeDiscounts.length > 0 ? (
                  <Col md={12} lg={12}>
                    <TimeDiscountContent timeDiscounts={timeDiscounts} />
                  </Col>
                ) : (
                  <Empty>
                    <EmptyLabel label="desconto temporal" />
                  </Empty>
                )}
              </>
            )}
          </Row>
        </TimeDiscountContentContainer>

        <Row>
          <Pagination
            currentPage={currentPage}
            totalPages={total ? Math.ceil(total / itemsPerPage) : 0}
            onPageChange={handlePageChange}
          />
        </Row>
      </AdminLayout>
    </>
  )
}

