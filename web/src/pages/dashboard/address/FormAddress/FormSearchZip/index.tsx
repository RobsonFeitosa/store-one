import { TextInputMask } from '@lemonade-technologies-hub-ui/react'
import { BtnButton, Form, FormSearchZipContainer } from './styles'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import cep from 'cep-promise'
import { useToast } from '@/hooks/providers/toast'
import { IAddressDTO } from '@/pages/dtos/address.dto'

const searchZipForm = z.object({
  zipcode: z.string(),
})

export type SearchZipFormData = z.infer<typeof searchZipForm>

interface FormSearchZipProps {
  zipcode: string | undefined
  onPayloadAddress: (address: IAddressDTO) => void
}

export default function FormSearchZip({
  zipcode,
  onPayloadAddress,
}: FormSearchZipProps) {
  const { addToast } = useToast()

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<SearchZipFormData>({
    resolver: zodResolver(searchZipForm),
    defaultValues: {
      zipcode: '80620100',
    },
  })

  function handleRegister(data: SearchZipFormData) {
    cep(data.zipcode)
      .then((response) => {
        if (response) {
          onPayloadAddress({
            street: response.street,
            state: response.state,
            neighborhood: response.neighborhood,
            city: response.city,
            zipcode: response.cep,
          } as IAddressDTO)
        }
        return false
      })
      .catch((err) => {
        addToast({
          type: 'error',
          title: 'Cep nao encontrado',
          description: 'Tente outro cep novamente.',
        })
        return err
      })
    reset()
  }

  return (
    <FormSearchZipContainer>
      <Form as="form" onSubmit={handleSubmit(handleRegister)}>
        <TextInputMask
          type="string"
          mask="99999-999"
          placeholder="Pesquisar cep"
          defaultValue={zipcode}
          error={errors.zipcode?.message}
          {...register('zipcode')}
        />

        <BtnButton size="md" type="submit" disabled={isSubmitting || !isDirty}>
          Pesquisar
        </BtnButton>
      </Form>
    </FormSearchZipContainer>
  )
}
