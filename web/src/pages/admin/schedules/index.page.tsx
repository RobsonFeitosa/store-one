/* eslint-disable @typescript-eslint/no-unused-vars */
import AdminLayout from '@/components/components/Layout/Admin'
import { ScheduleContainer } from './styles'
import { Dialog, DialogRoot, Text } from '@lemonade-technologies-hub-ui/react'
import { Col, Row } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { useGetAllSchedullings } from '../hooks_generic/useGetAllSchedullings'
import { useAuth } from '@/hooks/providers/auth'
import Pagination from '@/components/Pagination'
import Schedulling from './Schedullings'
import { IScheduleDTO } from '../dtos/schedule.dto'
import { Loading } from '@/components/Loading'
import EmptyLabel from '@/components/EmptyLabel'

const itemsPerPage = 12

export default function Schedule() {
  const { user } = useAuth()
  const [currentPage, setCurrentPage] = useState(1)
  const [openModalEdit, setOpenModalEdit] = useState(false)
  const [orderId, setOrderId] = useState('')
  const [schedullings, setSchedullings] = useState<IScheduleDTO[]>([])

  const {
    isLoading,
    data: dataSchedulling,
    refetch: getAllSchedullings,
  } = useGetAllSchedullings({
    limit: itemsPerPage,
    page: currentPage,
  })

  const [, total] = dataSchedulling ?? []

  function handlePageChange(page: number) {
    setCurrentPage(page)
  }

  useEffect(() => {
    if (user) {
      getAllSchedullings()
    }
  }, [user, currentPage, getAllSchedullings])

  useEffect(() => {
    if (dataSchedulling) {
      setSchedullings(dataSchedulling[0])
    }
  }, [dataSchedulling])

  function handleSchedullingOrder(orderId: string) {
    setOrderId(orderId)
    setOpenModalEdit(true)
  }

  return (
    <>
      <DialogRoot open={false}>
        <Dialog offClosed title="">
          <div>asdf</div>
        </Dialog>
      </DialogRoot>

      <AdminLayout>
        <ScheduleContainer>
          <Row>
            {isLoading ? (
              <Loading />
            ) : (
              <>
                {schedullings && schedullings?.length > 0 ? (
                  schedullings?.map((schedulling) => (
                    <Col md={4} lg={4} key={schedulling.id}>
                      <Schedulling
                        schedulling={schedulling}
                        onEditSchedullingId={handleSchedullingOrder}
                      />
                    </Col>
                  ))
                ) : (
                  <EmptyLabel label="agendamento" />
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
        </ScheduleContainer>
      </AdminLayout>
    </>
  )
}
