import AdminLayout from '@/components/components/Layout/Admin'
import { Heading, Text } from '@lemonade-technologies-hub-ui/react'
import { useState } from 'react'
import { useGetAllCustomers, ICustomerDTO } from '../../hooks/useGetAllCustomers'
import { Col, Row } from 'react-bootstrap'
import Pagination from '@/components/Pagination'
import EmptyLabel from '@/components/EmptyLabel'
import { Loading } from '@/components/Loading'
import { styled } from '@lemonade-technologies-hub-ui/react'
import { User } from 'phosphor-react'

const PageContainer = styled('div', { padding: '$6' })

const PageHeader = styled('div', {
  marginBottom: '$6',
  display: 'flex',
  alignItems: 'center',
  gap: '$3',
})

const UserCard = styled('div', {
  background: '$white',
  border: '1px solid $gray200',
  borderRadius: '$sm',
  padding: '$4',
  marginBottom: '$4',

  '& h5': {
    fontSize: '$sm',
    fontWeight: '600',
    marginBottom: '$1',
  },
})

const StatusBadge = styled('span', {
  display: 'inline-block',
  padding: '2px $2',
  borderRadius: '$full',
  fontSize: '$xs',

  variants: {
    active: {
      true: { background: '#e6f4ea', color: '#2e7d32' },
      false: { background: '#fce8e6', color: '#c62828' },
    },
  },
})

const itemsPerPage = 12

export default function Clients() {
  const [currentPage, setCurrentPage] = useState(1)
  const [customers, setCustomers] = useState<ICustomerDTO[]>([])

  const {
    isLoading,
    data: dataCustomers,
  } = useGetAllCustomers({ limit: itemsPerPage, page: currentPage })

  const [customersData, total] = dataCustomers ?? []

  if (customersData && customersData !== customers) {
    setCustomers(customersData)
  }

  function handlePageChange(page: number) {
    setCurrentPage(page)
  }

  return (
    <AdminLayout>
      <PageContainer>
        <PageHeader>
          <User size={28} />
          <Heading as="h2">Clientes</Heading>
        </PageHeader>

        <Row>
          {isLoading ? (
            <Loading />
          ) : (
            <>
              {customers && customers.length > 0 ? (
                customers.map((customer) => (
                  <Col sm={12} md={6} lg={4} key={customer.id}>
                    <UserCard>
                      <Heading as="h5">{customer.name}</Heading>
                      <Text>{customer.email}</Text>
                      <StatusBadge active={customer.settings?.actived ?? false}>
                        {customer.settings?.actived ? 'Ativo' : 'Inativo'}
                      </StatusBadge>
                    </UserCard>
                  </Col>
                ))
              ) : (
                <EmptyLabel label="cliente" />
              )}
            </>
          )}
        </Row>

        {!!total && (
          <Row>
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(total / itemsPerPage)}
              onPageChange={handlePageChange}
            />
          </Row>
        )}
      </PageContainer>
    </AdminLayout>
  )
}
