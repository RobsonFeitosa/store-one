import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  TextInput,
} from '@lemonade-technologies-hub-ui/react'
import { Form, FormTenantsContainer } from './styles'
import { useForm } from 'react-hook-form'
import { DialogCloseCustom } from '@/components/DialogCloseCustom'
import { useEffect } from 'react'
import { ITenantDTO } from '../../dtos/tenant.dto'
import { useCreateTenant } from '../../hooks/useCreateTenant'
import { useUpdateTenant } from '../../hooks/useUpdateTenant'

const tenantsForm = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  slug: z.string().min(1, 'Slug é obrigatório'),
})

export type TenantsFormData = z.infer<typeof tenantsForm>

interface FormTenantsProps {
  onClose: () => void
  onRefetch: () => void
  tenant: ITenantDTO | null
}

export default function FormTenants({
  onClose,
  onRefetch,
  tenant,
}: FormTenantsProps) {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<TenantsFormData>({
    resolver: zodResolver(tenantsForm),
    defaultValues: {
      name: tenant?.name,
      slug: tenant?.slug,
    },
  })

  const { isSuccess: isSuccessCreate, mutateAsync: createTenantAsync } =
    useCreateTenant()

  const { isSuccess: isSuccessUpdate, mutateAsync: updateTenantAsync } = useUpdateTenant(
    tenant?.id,
  )

  async function handleRegister(data: TenantsFormData) {
    if (tenant) {
      await updateTenantAsync(data)
    } else {
      await createTenantAsync(data)
    }
  }

  useEffect(() => {
    if (isSuccessCreate || isSuccessUpdate) {
      onRefetch()
      onClose()
    }
  }, [isSuccessCreate, isSuccessUpdate, onRefetch, onClose])

  return (
    <FormTenantsContainer>
      <DialogCloseCustom onClose={onClose} />
      <Form as="form" onSubmit={handleSubmit(handleRegister)}>
        <TextInput
          size="sm"
          placeholder="Nome da Loja"
          error={errors.name?.message}
          {...register('name')}
        />
        <TextInput
          size="sm"
          placeholder="Slug (ex: minha-loja)"
          error={errors.slug?.message}
          {...register('slug')}
        />

        <Button size="sm" type="submit" disabled={isSubmitting}>
          Salvar
        </Button>
      </Form>
    </FormTenantsContainer>
  )
}
