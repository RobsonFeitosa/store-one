import { useEffect, useState } from 'react'
import { Button, Text, TextInput } from '@lemonade-technologies-hub-ui/react'
import { useAuth } from '@/hooks/providers/auth'
import { useGetAllAddress } from '@/hooks/useGetAllAddress'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Check, Plus, ArrowLeft } from 'phosphor-react'
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

  const [isCreating, setIsCreating] = useState(false)
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
    setIsCreating(false)
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

  if (isCreating || (addresses && addresses.length === 0)) {
    return (
      <AddressContainer>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          {addresses && addresses.length > 0 && (
            <Button 
              onClick={() => setIsCreating(false)} 
              variant="tertiary" 
              style={{ padding: '4px', minWidth: 'auto', background: 'transparent', color: '$gray900' }}
            >
              <ArrowLeft size={20} />
            </Button>
          )}
          <Text as="strong">Cadastre seu endereço</Text>
        </div>

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
            Salvar endereço
          </Button>
        </Form>
      </AddressContainer>
    )
  }

  return (
    <AddressContainer>
      {addresses && addresses.length > 0 ? (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <Text>Endereço de entrega</Text>
            <Button 
              onClick={() => setIsCreating(true)} 
              variant="tertiary" 
              style={{ padding: '0', fontSize: '14px', color: '#f97316', background: 'transparent' }}
            >
              <Plus size={16} style={{ marginRight: '4px' }} />
              Novo
            </Button>
          </div>

          {addressPrimary && (
            <>
              <AddressContent key={addressPrimary.id}>
                <BtnPrimary disabled selected>
                  <div>
                    <Text as="strong" style={{ color: '#f97316' }}>{addressPrimary.title}</Text>
                    <Text size="sm" color="$gray600">
                      {`${addressPrimary.neighborhood}, ${addressPrimary.street}, ${addressPrimary.street_number}`}
                    </Text>
                    <Text size="sm" color="$gray600">
                      {`${addressPrimary.city} - ${addressPrimary.state}`}
                    </Text>
                  </div>

                  <Check size={22} color="#f97316" />
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
        <div style={{ textAlign: 'center', padding: '24px 0' }}>
          <Text style={{ marginBottom: '16px', display: 'block' }}>
            {addresses ? 'Nenhum endereço cadastrado.' : 'Carregando endereços...'}
          </Text>
          {addresses && (
            <Button onClick={() => setIsCreating(true)}>
              <Plus size={20} style={{ marginRight: '8px' }} />
              Cadastrar Endereço
            </Button>
          )}
        </div>
      )}
    </AddressContainer>
  )
}
