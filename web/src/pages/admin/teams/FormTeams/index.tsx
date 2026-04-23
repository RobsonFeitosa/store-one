/* eslint-disable react-hooks/exhaustive-deps */
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  SelectAdvanced,
  TextInput,
} from '@lemonade-technologies-hub-ui/react'
import { Form, FormTeamsContainer } from './styles'
import { Controller, useForm } from 'react-hook-form'
import { DialogCloseCustom } from '@/components/DialogCloseCustom'
import { useEffect, useMemo } from 'react'
import { Option } from '@/dtos'
import { useCreateTeam } from '../../hooks/useCreateTeam'
import { useGetAllUsersTeamsAvailables } from '../../hooks/useGetAllUsersTeamsAvailables'
import { ITeamsDTO } from '../../schedules/dtos/teams.dto'
import { useUpdateTeam } from '../../hooks/useUpdateTeam'

const teamsForm = z.object({
  name: z.string(),
  operation: z.string(),
  professionalsIds: z
    .array(z.string())
    .min(1, 'É necessário selecionar um colaborador'),
})

export type TeamsFormData = z.infer<typeof teamsForm>

interface FormTeamsProps {
  onClose: () => void
  onRefetch: () => void
  team: ITeamsDTO | null
}
export default function FormTeams({
  onClose,
  onRefetch,
  team,
}: FormTeamsProps) {
  const { data: usersProfessionals, refetch: getAllUsersTeamsAvailables } =
    useGetAllUsersTeamsAvailables()

  const usersOptions = useMemo(() => {
    const opt: Option[] | null =
      team &&
      team?.professional.map((p) => ({
        label: p.name,
        value: p.id,
      }))

    const optionsUsersProfessionals = usersProfessionals?.map((user) => ({
      label: user.name,
      value: user.professionalId,
    }))

    if (opt) {
      const options = optionsUsersProfessionals
        ? opt.concat(optionsUsersProfessionals)
        : []

      const values = options.map(({ value }) => value)
      const filtered = options.filter(
        ({ value }, index) => !values.includes(value, index + 1),
      )

      return filtered
    }

    return optionsUsersProfessionals ?? []
  }, [usersProfessionals, team])

  const {
    handleSubmit,
    control,
    register,
    formState: { errors, isSubmitting },
  } = useForm<TeamsFormData>({
    resolver: zodResolver(teamsForm),
    defaultValues: {
      name: team?.name,
      operation: team?.operation,
      professionalsIds: team?.professional.map((c) => c.id),
    },
  })

  const { isSuccess: isSuccessCreate, mutateAsync: createTeamAsync } =
    useCreateTeam()

  const { data: updateData, mutateAsync: updateTeamAsync } = useUpdateTeam(
    team?.id,
  )

  async function handleRegister(data: TeamsFormData) {
    if (team) {
      await updateTeamAsync(data)
    } else {
      await createTeamAsync(data)
    }
  }

  useEffect(() => {
    getAllUsersTeamsAvailables()
  }, [getAllUsersTeamsAvailables])

  useEffect(() => {
    if (isSuccessCreate) {
      onRefetch()
      onClose()
    }
  }, [isSuccessCreate])

  useEffect(() => {
    if (updateData) {
      onRefetch()
      onClose()
    }
  }, [updateData])

  return (
    <FormTeamsContainer>
      <DialogCloseCustom onClose={onClose} />
      <Form as="form" onSubmit={handleSubmit(handleRegister)}>
        <TextInput
          size="sm"
          placeholder="Nome"
          error={errors.name?.message}
          {...register('name')}
        />
        <TextInput
          size="sm"
          placeholder="Operação"
          error={errors.operation?.message}
          {...register('operation')}
        />

        <Controller
          control={control}
          name="professionalsIds"
          render={({ field: { onChange, name }, fieldState: { error } }) => {
            return (
              <SelectAdvanced
                isMulti
                options={usersOptions}
                error={error?.message as string}
                placeholder="Adicionar um ou mais colaborador"
                onChange={(data: any) => {
                  onChange(data.map((d: Option) => d.value))
                }}
                name={name}
                defaultValue={team?.professional.map((p) => ({
                  label: p.name,
                  value: p.id,
                }))}
              />
            )
          }}
        />
        <Button size="sm" type="submit" disabled={isSubmitting}>
          Salvar
        </Button>
      </Form>
    </FormTeamsContainer>
  )
}
