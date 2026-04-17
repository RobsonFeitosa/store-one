import { Checkbox, Text, TextInput } from '@lemonade-technologies-hub-ui/react'
import FormSearchZip from './FormSearchZip'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { DialogCloseCustom } from '@/components/DialogCloseCustom'
import { IAddressDTO } from '@/pages/dtos/address.dto'
import { Controller, useForm } from 'react-hook-form'
import Regions from './Regions'
import { useCreateAddress } from '@/hooks/useCreateAddress'
import { useEffect } from 'react'
import { useToast } from '@/hooks/providers/toast'
import { useGetAllAddress } from '@/hooks/useGetAllAddress'
import { useUpdateAddress } from '@/hooks/useUpdateAddress'

import {
  AddressSearchZip,
  BtnAddress,
  Form,
  FormAddressContainer,
  Hr,
  LabelPrimary,
  RowFlex,
} from './styles'

const addressForm = z.object({
  title: z.string().min(1, { message: 'O título é obrigatório.' }),
  primary: z.boolean().optional(),
  zipcode: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  neighborhood: z.string().min(1, { message: 'O bairro é obrigatório.' }),
  street: z.string().min(1, { message: 'O rua é obrigatório.' }),
  street_number: z.string().min(1, { message: 'O número é obrigatório.' }),
})

export type AddressFormData = z.infer<typeof addressForm>

interface FormAddressProps {
  address: IAddressDTO | undefined
  itemsPerPage: number
  onClose: () => void
  onLoading: () => void
  onResetPagination: () => void
}

export default function FormAddress({
  address,
  itemsPerPage,
  onClose,
  onLoading,
  onResetPagination,
}: FormAddressProps) {
  const { addToast } = useToast()

  const { isSuccess, mutateAsync: createAddressAsync } = useCreateAddress()
  const { isSuccess: isSuccessUpdate, mutateAsync: updateAddressAsync } =
    useUpdateAddress(address?.id ?? '')
  const { refetch: getAllAddress } = useGetAllAddress({
    limit: itemsPerPage,
    page: 1,
  })

  const {
    handleSubmit,
    register,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressForm),
    defaultValues: {
      title: address?.title,
      street: address?.street,
      street_number: address?.street_number,
      neighborhood: address?.neighborhood,
      country: address?.country,
      state: address?.state,
      city: address?.city,
      zipcode: address?.zipcode,
      primary: address?.primary,
    },
  })

  function handleRegister(data: AddressFormData) {
    if (address?.id) {
      updateAddressAsync(data as IAddressDTO)
    } else {
      createAddressAsync(data)
    }
  }

  function onPayloadAddress(address: IAddressDTO) {
    setValue('city', address.city)
    setValue('state', address.state)
    setValue('zipcode', address.zipcode)
    setValue('neighborhood', address.neighborhood)
    setValue('street', address.street)
    setValue('country', 'Brasil')
  }

  useEffect(() => {
    if (isSuccess) {
      addToast({
        type: 'success',
        title: 'Endereço salvo com sucesso',
      })

      reset()
      onClose()
      onResetPagination()

      onLoading()
      setTimeout(() => {
        getAllAddress()
      }, 400)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess])

  useEffect(() => {
    if (isSuccessUpdate) {
      addToast({
        type: 'success',
        title: 'Endereço atualizado com sucesso',
      })

      reset()
      onClose()
      onResetPagination()

      onLoading()
      setTimeout(() => {
        getAllAddress()
      }, 400)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessUpdate])

  return (
    <>
      <DialogCloseCustom onClose={onClose} />
      <FormAddressContainer>
        <AddressSearchZip>
          <FormSearchZip
            zipcode={address?.zipcode}
            onPayloadAddress={onPayloadAddress}
          />
        </AddressSearchZip>

        <Hr />

        <Form as="form" onSubmit={handleSubmit(handleRegister)}>
          <TextInput
            type="string"
            placeholder="Titulo"
            error={errors.title?.message}
            {...register('title')}
          />
          <TextInput
            type="string"
            placeholder="Rua"
            error={errors.street?.message}
            {...register('street')}
          />

          <TextInput
            type="string"
            placeholder="Bairro"
            error={errors.neighborhood?.message}
            {...register('neighborhood')}
          />

          <RowFlex>
            <TextInput
              type="string"
              placeholder="Número"
              error={errors.street_number?.message}
              {...register('street_number')}
            />

            <TextInput
              type="string"
              placeholder="País"
              error={errors.country?.message}
              {...register('country')}
              disabled
            />
          </RowFlex>

          <Regions control={control} />

          <Controller
            control={control}
            name="primary"
            render={({ field: { onChange, ref, value } }) => {
              return (
                <LabelPrimary>
                  <Checkbox
                    id="primary"
                    onCheckedChange={(checked) => {
                      onChange(checked)
                    }}
                    ref={ref}
                    checked={!!value}
                  />
                  <Text>Endereço principal</Text>
                </LabelPrimary>
              )
            }}
          />

          <BtnAddress type="submit">Salvar</BtnAddress>
        </Form>
      </FormAddressContainer>
    </>
  )
}
