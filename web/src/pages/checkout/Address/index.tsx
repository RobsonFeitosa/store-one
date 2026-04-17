import { useEffect, useState } from 'react'
import { Button, Text, TextInput } from '@lemonade-technologies-hub-ui/react'
import { useAuth } from '@/hooks/providers/auth'
import { useGetAllAddress } from '@/hooks/useGetAllAddress'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Check } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { AddresByZipCodeProps } from '@/hooks/useGetAddresByZipcode'
import { useCreateAddress } from '@/hooks/useCreateAddress'
import AddressesList from './AddressesList'
import Zipcode from './Zipcode'
import { AddressContainer, AddressContent, BtnPrimary, Form } from './styles'
import { IAddressDTO } from '@/pages/dtos/address.dto'

const addressForm = z.object({
  title: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  country: z.string().min(1),
  primary: z.boolean().optional(),
  neighborhood: z.string().min(1),
  street: z.string().min(1),
  street_number: z.string().min(1),
})

export type AddressFormData = z.infer<typeof addressForm>

interface AddressProps {
  onAddress: (address: IAddressDTO) => void
}

export default function Address({ onAddress }: AddressProps) {
  const { user } = useAuth()

  const [zipcode, setZipcode] = useState('')

  const { data: addressData, refetch: getAddress } = useGetAllAddress()

  useEffect(() => {
    user && getAddress()
  }, [user, getAddress])

  const [addresses] = addressData ?? []

  useEffect(() => {
    if (addresses) {
      const address = addresses.find((addr) => addr.primary)
      if (address) {
        onAddress(address)
      }
    }
  }, [addresses, onAddress])

  const {
    handleSubmit,
    setValue,
    register,
    formState: { errors, isSubmitting },
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressForm),
  })

  const {
    data: dataAddressCreate,
    isSuccess: isSuccessCreate,
    mutateAsync: asyncCreateAddress,
  } = useCreateAddress()

  async function handleRegister(data: AddressFormData) {
    await asyncCreateAddress({
      ...data,
      zipcode,
      primary: true,
    })
  }

  function setZipcodeByAddress(zipcode: AddresByZipCodeProps) {
    setValue('city', zipcode.city)
    setValue('state', zipcode.state)
    setValue('street_number', zipcode.street)
    setValue('country', 'Brasil')
    setValue('neighborhood', zipcode.neighborhood)

    setZipcode(zipcode.cep)
  }

  function setSuccessPrimary() {
    setTimeout(() => {
      getAddress()
    }, 300)
  }

  useEffect(() => {
    if (isSuccessCreate) {
      setTimeout(() => {
        getAddress()
      }, 300)
    }
  }, [isSuccessCreate, getAddress])

  useEffect(() => {
    if (dataAddressCreate) {
      if (dataAddressCreate.data) {
        onAddress(dataAddressCreate.data)
      }
    }
  }, [dataAddressCreate, onAddress])

  const addressPrimary = addresses?.find((address) => address.primary)

  return (
    <AddressContainer>
      {addresses &&
        (addresses.length > 0 ? (
          <div>
            <Text>Selecione um endereço para entrega</Text>

            {addressPrimary && (
              <>
                <AddressContent key={addressPrimary.id}>
                  <BtnPrimary disabled selected>
                    <div>
                      <Text as="strong">{addressPrimary.title}</Text>
                      <Text>
                        {`${addressPrimary.neighborhood}, ${addressPrimary.street}, ${addressPrimary.street_number}`}
                      </Text>
                    </div>

                    <Check size={22} />
                  </BtnPrimary>
                </AddressContent>
                {addresses.length > 1 && <hr />}
              </>
            )}

            <AddressesList
              addresses={addresses}
              onSuccessPrimary={setSuccessPrimary}
            />
          </div>
        ) : (
          <>
            <Text>Cadastre seu endereço</Text>

            <Zipcode onZipcodeByAddress={setZipcodeByAddress} />

            <hr />

            <Form as="form" onSubmit={handleSubmit(handleRegister)}>
              <TextInput
                placeholder="Titulo"
                error={errors.title?.message}
                {...register('title')}
              />
              <TextInput
                placeholder="Bairro"
                error={errors.neighborhood?.message}
                {...register('neighborhood')}
              />
              <TextInput
                placeholder="Rua"
                error={errors.street?.message}
                {...register('street')}
              />
              <TextInput
                placeholder="Numero"
                error={errors.street_number?.message}
                {...register('street_number')}
              />
              <TextInput
                placeholder="Cidade"
                error={errors.city?.message}
                {...register('city')}
              />
              <TextInput
                placeholder="Estado"
                error={errors.state?.message}
                {...register('state')}
              />
              <TextInput
                placeholder="País"
                error={errors.country?.message}
                {...register('country')}
              />

              <Button size="lg" type="submit" disabled={isSubmitting}>
                Salvar
              </Button>
            </Form>
          </>
        ))}
    </AddressContainer>
  )
}
