import AdminLayout from '@/components/components/Layout/Admin'
import {
  Dialog,
  DialogRoot,
  Heading,
  Text,
} from '@lemonade-technologies-hub-ui/react'
import { useState } from 'react'
import { Pencil, Trash, Storefront } from 'phosphor-react'
import { useGetAllTenants } from '../hooks/useGetAllTenants'
import { useDeleteTenant } from '../hooks/useDeleteTenant'
import FormTenants from './FormTenants'
import { Col, Row } from 'react-bootstrap'
import { ITenantDTO } from '../dtos/tenant.dto'
import EmptyLabel from '@/components/EmptyLabel'
import { Loading } from '@/components/Loading'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

import {
  BtnAddNewTenant,
  TenantsContainer,
  TenantsContent,
  TenantsHeader,
  BtnEditTenant,
  TenantActions,
  BtnDelete,
  BoxWrapper,
  TenantWrapper,
  TenantListWrapper,
} from './styles'

export default function Tenants() {
  const [openModal, setOpenModal] = useState(false)
  const [editTenant, setEditTenant] = useState<ITenantDTO | null>(null)

  const {
    isLoading,
    data: tenants,
    refetch: getTenants,
  } = useGetAllTenants()

  const { mutateAsync: deleteTenantAsync } = useDeleteTenant()

  function handleAddNewTenant() {
    setOpenModal(true)
  }

  function onRefetch() {
    getTenants()
  }

  function handleEditTenant(tenant: ITenantDTO) {
    setEditTenant(tenant)
    setOpenModal(true)
  }

  async function handleDeleteTenant(id: string) {
    await deleteTenantAsync(id)
  }

  function onClose() {
    setOpenModal(false)
    setEditTenant(null)
  }

  return (
    <>
      <DialogRoot open={openModal}>
        <Dialog offClosed title={editTenant ? 'Editar loja' : 'Criar nova loja'}>
          <FormTenants onClose={onClose} onRefetch={onRefetch} tenant={editTenant} />
        </Dialog>
      </DialogRoot>
      <AdminLayout>
        <TenantsContainer>
          <TenantsContent>
            <TenantsHeader>
              <BtnAddNewTenant onClick={handleAddNewTenant}>
                Adicionar loja <Storefront size={16} />
              </BtnAddNewTenant>
            </TenantsHeader>

            <TenantListWrapper>
              <Row>
                {isLoading ? (
                  <Loading />
                ) : (
                  <>
                    {tenants && tenants.length > 0 ? (
                      tenants.map((tenant) => (
                        <Col sm={3} md={3} lg={3} key={tenant.id}>
                          <BoxWrapper>
                            <TenantWrapper>
                              <div>
                                <Heading as="h5">{tenant.name}</Heading>

                                <TenantActions>
                                  <BtnEditTenant onClick={() => handleEditTenant(tenant)}>
                                    <Pencil size={18} />
                                  </BtnEditTenant>

                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <BtnDelete>
                                        <Trash size={18} />
                                      </BtnDelete>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent size="sm">
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>Excluir loja</AlertDialogTitle>
                                        <AlertDialogDescription>
                                          Tem certeza que deseja excluir a loja{' '}
                                          <strong>{tenant.name}</strong>? Esta ação não
                                          pode ser desfeita.
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                        <AlertDialogAction
                                          variant="destructive"
                                          onClick={() => handleDeleteTenant(tenant.id)}
                                        >
                                          Excluir
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                </TenantActions>
                              </div>
                              <Text>Slug: {tenant.slug}</Text>
                              <Text>Status: {tenant.active ? 'Ativa' : 'Inativa'}</Text>
                            </TenantWrapper>
                          </BoxWrapper>
                        </Col>
                      ))
                    ) : (
                      <EmptyLabel label="loja" female />
                    )}
                  </>
                )}
              </Row>
            </TenantListWrapper>
          </TenantsContent>
        </TenantsContainer>
      </AdminLayout>
    </>
  )
}
