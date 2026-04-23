import AdminLayout from '@/components/components/Layout/Admin'
import {
  Dialog,
  DialogRoot,
  Heading,
  Text,
} from '@lemonade-technologies-hub-ui/react'
import { useEffect, useState } from 'react'
import { Pencil, Trash, UsersThree } from 'phosphor-react'
import { useGetAllTeams } from '../hooks/useGetAllTeams'
import FormTeams from './FormTeams'
import { Col, Row } from 'react-bootstrap'
import Pagination from '@/components/Pagination'
import { ITeamsDTO } from '../schedules/dtos/teams.dto'
import { useDeleteTeam } from '../hooks/useDeleteTeam'

import {
  BtnAddNewTeam,
  TeamWrapper,
  ProfessionalsContent,
  TeamsContainer,
  TeamsHeader,
  Professional,
  ProfessionalTeam,
  BtnEditTeam,
  Professionals,
  TeamActions,
  BtnDelete,
  ProfessionalWrapper,
  BoxWrapper,
} from './styles'
import EmptyLabel from '@/components/EmptyLabel'
import { Loading } from '@/components/Loading'
import { useAuth } from '@/hooks/providers/auth'

const itemsPerPage = 12

export default function Teams() {
  const [openModal, setOpenModal] = useState(false)
  const [editTeam, setEditTeam] = useState<ITeamsDTO | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const { user } = useAuth()

  function handleAddNewTeam() {
    setOpenModal(true)
  }

  const {
    isLoading,
    data: teamsData,
    refetch: getTeams,
  } = useGetAllTeams({
    limit: itemsPerPage,
    page: currentPage,
  })

  useEffect(() => {
    user && getTeams()
  }, [user, getTeams])

  const [teams, total] = teamsData ?? []

  function handlePageChange(page: number) {
    setCurrentPage(page)
  }

  function onRefetch() {
    getTeams()
  }

  function handleEditTeam(team: ITeamsDTO) {
    setEditTeam(team)
    setOpenModal(true)
  }

  const { isSuccess: isSuccessDelete, mutateAsync: deleteTeamAsync } =
    useDeleteTeam()

  async function handleDeleteTeam(id: string) {
    await deleteTeamAsync(id)
  }

  function onClose() {
    setOpenModal(false)
    setEditTeam(null)
  }

  useEffect(() => {
    if (isSuccessDelete) {
      onRefetch()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessDelete])

  return (
    <>
      <DialogRoot open={openModal}>
        <Dialog offClosed title="Criar nova equipe">
          <FormTeams onClose={onClose} onRefetch={onRefetch} team={editTeam} />
        </Dialog>
      </DialogRoot>
      <AdminLayout>
        <TeamsContainer>
          <ProfessionalsContent>
            <TeamsHeader>
              <BtnAddNewTeam onClick={handleAddNewTeam}>
                Adicionar equipe <UsersThree size={16} />
              </BtnAddNewTeam>
            </TeamsHeader>

            <ProfessionalWrapper>
              <Row>
                {isLoading ? (
                  <Loading />
                ) : (
                  <>
                    {teams && teams.length > 0 ? (
                      teams.map((team) => (
                        <Col sm={3} md={3} lg={3} key={team.id}>
                          <BoxWrapper>
                            <TeamWrapper>
                              <div>
                                <Heading as="h5">{team.name}</Heading>

                                <TeamActions>
                                  <BtnEditTeam
                                    onClick={() => handleEditTeam(team)}
                                  >
                                    <Pencil size={18} />
                                  </BtnEditTeam>
                                  <BtnDelete
                                    onClick={() => handleDeleteTeam(team.id)}
                                  >
                                    <Trash size={18} />
                                  </BtnDelete>
                                </TeamActions>
                              </div>
                              <Text>Operações: {team.operation}</Text>
                            </TeamWrapper>
                            <ProfessionalTeam>
                              <Professionals
                                isMult={team.professional.length > 4}
                              >
                                {team.professional.map((professional) => (
                                  <Professional key={professional.id}>
                                    <Text as="strong">{professional.name}</Text>
                                  </Professional>
                                ))}
                              </Professionals>
                            </ProfessionalTeam>
                          </BoxWrapper>
                        </Col>
                      ))
                    ) : (
                      <EmptyLabel label="equipe" female />
                    )}
                  </>
                )}
              </Row>
            </ProfessionalWrapper>

            {!!total && (
              <Row>
                <Pagination
                  currentPage={currentPage}
                  totalPages={total ? Math.ceil(total / itemsPerPage) : 0}
                  onPageChange={handlePageChange}
                />
              </Row>
            )}
          </ProfessionalsContent>
        </TeamsContainer>
      </AdminLayout>
    </>
  )
}
