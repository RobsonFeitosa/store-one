import DashboardLayout from '@/components/components/Layout/Dashboard'
import { useGetAllAddress } from '@/hooks/useGetAllAddress'
import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/providers/auth'
import { Col, Container, Row } from 'react-bootstrap'
import {
  Dialog,
  DialogRoot,
  Heading,
  Text,
} from '@lemonade-technologies-hub-ui/react'
import AddressSingle from './AddressSingle'
import { Info, Plus } from 'phosphor-react'
import FormAddress from './FormAddress'
import Skeleton from 'react-loading-skeleton'
import { IAddressDTO } from '@/pages/dtos/address.dto'
import Pagination from '@/components/Pagination'
import { useGetIsPrimaryAddress } from '@/hooks/useGetIsPrimaryAddress'

import {
  AddressContainer,
  AddressHeader,
  AddressInfor,
  AddressesContainer,
  BtnAddNewAddress,
} from './styles'

const itemsPerPage = 4

export default function Address() {
  const { user } = useAuth()
  const [currentPage, setCurrentPage] = useState(1)
  const [openModal, setOpenModal] = useState(false)
  const [updateAddress, setUpdateAddress] = useState<IAddressDTO | undefined>()

  const {
    isLoading: isLoadingAddresses,
    data: addressData,
    refetch: getAllAddress,
  } = useGetAllAddress({
    limit: itemsPerPage,
    page: currentPage,
  })

  const [isLoading, setIsLoading] = useState(isLoadingAddresses)

  useEffect(() => {
    user && getAllAddress()
  }, [currentPage, getAllAddress, user])

  const [addresses, total] = addressData ?? []

  function handlePageChange(page: number) {
    setCurrentPage(page)
  }

  function handleNewAddress() {
    setOpenModal(true)
  }

  function onUpdateAddress(address: IAddressDTO) {
    setUpdateAddress(address)
    setOpenModal(true)
  }

  function onLoading() {
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 400)
  }

  useEffect(() => {
    onLoading()
  }, [isLoadingAddresses])

  useEffect(() => {
    if (!openModal) {
      setUpdateAddress(undefined)
    }
  }, [openModal])

  function onResetPagination() {
    setCurrentPage(1)
  }

  const { data: isExistPrimary, refetch: getIsPrimaryAddress } =
    useGetIsPrimaryAddress()

  useEffect(() => {
    user && getIsPrimaryAddress()
  }, [user, getIsPrimaryAddress])

  return (
    <>
      <DialogRoot open={openModal}>
        <Dialog
          offClosed
          title={`${updateAddress ? 'Atualizar' : 'Adicionar'} endereço`}
        >
          <FormAddress
            itemsPerPage={itemsPerPage}
            address={updateAddress}
            onLoading={onLoading}
            onResetPagination={onResetPagination}
            onClose={() => setOpenModal(false)}
          />
        </Dialog>
      </DialogRoot>

      <DashboardLayout>
        <AddressContainer>
          <Container>
            <AddressHeader>
              <Heading as="h4">Endereço ({total || 0})</Heading>

              <BtnAddNewAddress onClick={handleNewAddress}>
                <Plus size={16} />
                Novo
              </BtnAddNewAddress>
            </AddressHeader>

            {!isExistPrimary && (
              <AddressInfor>
                <Text>
                  <Info size={22} />
                  Defina um endereço como principal
                </Text>
              </AddressInfor>
            )}

            <AddressesContainer>
              <Row>
                {addresses?.map((address) => (
                  <Col key={address.id} xs="6" sm="6" md="6" lg="6">
                    {isLoading ? (
                      <Skeleton count={1} height={110} borderRadius={8} />
                    ) : (
                      <AddressSingle
                        itemsPerPage={itemsPerPage}
                        address={address}
                        onUpdateAddress={onUpdateAddress}
                        onLoading={onLoading}
                        onResetPagination={onResetPagination}
                      />
                    )}
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
            </AddressesContainer>
          </Container>
        </AddressContainer>
      </DashboardLayout>
    </>
  )
}
