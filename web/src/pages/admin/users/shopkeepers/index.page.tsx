import AdminLayout from '@/components/components/Layout/Admin'
import { Heading, Text } from '@lemonade-technologies-hub-ui/react'
import { useState } from 'react'
import { useGetAllShopkeepers, IShopkeeperDTO } from '../../hooks/useGetAllShopkeepers'
import { Col, Row } from 'react-bootstrap'
import Pagination from '@/components/Pagination'
import EmptyLabel from '@/components/EmptyLabel'
import { Loading } from '@/components/Loading'
import { styled } from '@lemonade-technologies-hub-ui/react'
import { Storefront } from 'phosphor-react'

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

export default function Shopkeepers() {
  const [currentPage, setCurrentPage] = useState(1)
  const [shopkeepers, setShopkeepers] = useState<IShopkeeperDTO[]>([])

  const {
    isLoading,
    data: dataShopkeepers,
  } = useGetAllShopkeepers({ limit: itemsPerPage, page: currentPage })

  const [shopkeepersData, total] = dataShopkeepers ?? []

  if (shopkeepersData && shopkeepersData !== shopkeepers) {
    setShopkeepers(shopkeepersData)
  }

  function handlePageChange(page: number) {
    setCurrentPage(page)
  }

  return (
    <AdminLayout>
      <PageContainer>
        <PageHeader>
          <Storefront size={28} />
          <Heading as="h2">Lojistas</Heading>
        </PageHeader>

        <Row>
          {isLoading ? (
            <Loading />
          ) : (
            <>
              {shopkeepers && shopkeepers.length > 0 ? (
                shopkeepers.map((shopkeeper) => (
                  <Col sm={12} md={6} lg={4} key={shopkeeper.id}>
                    <UserCard>
                      <Heading as="h5">{shopkeeper.name}</Heading>
                      <Text>{shopkeeper.email}</Text>
                      <Text size="xs">Loja: {shopkeeper.tenant_id ?? '—'}</Text>
                      <StatusBadge active={shopkeeper.settings?.actived ?? false}>
                        {shopkeeper.settings?.actived ? 'Ativo' : 'Inativo'}
                      </StatusBadge>
                    </UserCard>
                  </Col>
                ))
              ) : (
                <EmptyLabel label="lojista" />
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
