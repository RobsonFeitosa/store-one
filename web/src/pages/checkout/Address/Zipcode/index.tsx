import { useEffect } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { TextInputMask } from '@lemonade-technologies-hub-ui/react'
import { useForm } from 'react-hook-form'
import {
  AddresByZipCodeProps,
  useGetAddresByZipcode,
} from '@/hooks/useGetAddresByZipcode'
import { Form, ZipcodeContainer } from './styles'

const zipcodeForm = z.object({
  zipcode: z.string(),
})

export type ZipcodeFormData = z.infer<typeof zipcodeForm>

interface ZipcodeProps {
  onZipcodeByAddress: (zipcode: AddresByZipCodeProps) => void
}

export default function Zipcode({ onZipcodeByAddress }: ZipcodeProps) {
  const { data: addressByZipcode, mutateAsync: asyncAddresByZipcode } =
    useGetAddresByZipcode()

  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm<ZipcodeFormData>({
    resolver: zodResolver(zipcodeForm),
  })

  async function handleZipCode(data: ZipcodeFormData) {
    const { zipcode } = data

    await asyncAddresByZipcode(zipcode)
  }

  useEffect(() => {
    if (addressByZipcode) {
      onZipcodeByAddress(addressByZipcode)
    }
  }, [addressByZipcode, onZipcodeByAddress])

  return (
    <ZipcodeContainer>
      <Form as="form" onSubmit={handleSubmit(handleZipCode)}>
        <TextInputMask
          mask="99999-999"
          placeholder="Codigo postal"
          {...register('zipcode')}
        />
        <button type="submit" disabled={isSubmitting}>
          pesquisar
        </button>
      </Form>
    </ZipcodeContainer>
  )
}
