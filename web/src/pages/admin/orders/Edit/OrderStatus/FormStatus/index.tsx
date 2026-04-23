import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  SelectAdvanced,
  TextInput,
} from '@lemonade-technologies-hub-ui/react'
import { useCreateOrderStatus } from '@/hooks/useCreateOrderStatus'
import { useEffect, useState } from 'react'
import { useGetAllOrders } from '@/hooks/useGetAllOrders'
import { useGetOrder } from '@/hooks/useGetOrder'
import { useGetAllStatusByOrder } from '@/hooks/useGetAllStatusByOrder'
import { useUpdateTrackingCode } from '@/hooks/useUpdateTrackingCode'
import { IPaginationOptionDTO } from '@/pages/dtos/paginationOption.dto'

import { Form, FormStatusContainer } from './styles'

const optionsStatus = [
  {
    label: 'Pendente',
    value: 'pending',
  },
  {
    label: 'Aguardando pagamento',
    value: 'awaiting_payment',
  },
  {
    label: 'Aguardando cumprimento',
    value: 'awaiting_fulfillment',
  },
  {
    label: 'Aguardando envio',
    value: 'awaiting_shipment',
  },
  {
    label: 'Aguardando coleta',
    value: 'awaiting_pickup',
  },
  {
    label: 'Enviado parcialmente',
    value: 'partially_shipped',
  },
  {
    label: 'Concluído',
    value: 'completed',
  },
  {
    label: 'Enviado',
    value: 'shiped',
  },
  {
    label: 'Cancelado',
    value: 'cancelled',
  },
  {
    label: 'Recusou',
    value: 'declined',
  },
  {
    label: 'Devolveu',
    value: 'refunded',
  },
  {
    label: 'disputado',
    value: 'disputed',
  },
]

const zipcodeForm = z
  .object({
    status: z.string(),
    tracking_code: z.string().optional(),
  })
  .refine(
    (schema) => (schema.status === 'shiped' ? !!schema.tracking_code : true),
    {
      message: 'Campo obrigatório',
      path: ['tracking_code'],
    },
  )

export type ZipcodeFormData = z.infer<typeof zipcodeForm>

interface FormStatusProps {
  orderId: string
  statusException: string[]
  optionsPage: IPaginationOptionDTO
}

export default function FormStatus(data: FormStatusProps) {
  const { orderId, statusException, optionsPage } = data
  const { refetch: getAllOrders } = useGetAllOrders(optionsPage)

  const [isShipping, setIsShipping] = useState(false)

  const {
    handleSubmit,
    control,
    register,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ZipcodeFormData>({
    resolver: zodResolver(zipcodeForm),
  })

  const { isSuccess, mutateAsync: createOrderStatusAsync } =
    useCreateOrderStatus()

  const { refetch: getOrder } = useGetOrder(orderId)
  const { refetch: getOrderStatus } = useGetAllStatusByOrder(orderId)
  const { isSuccess: isSuccessCode, mutateAsync: updateTrackingCodeAsync } =
    useUpdateTrackingCode()

  async function handleRegister(data: ZipcodeFormData) {
    const { status, tracking_code } = data

    await createOrderStatusAsync({
      name: status,
      order_id: orderId,
    })

    if (tracking_code) {
      await updateTrackingCodeAsync({
        orderId,
        tracking_code,
      })
    }
  }

  useEffect(() => {
    if (isSuccessCode) {
      setIsShipping(false)
    }
  }, [isSuccessCode, setIsShipping])

  useEffect(() => {
    if (isSuccess) {
      getAllOrders()
      getOrder()
    }
  }, [isSuccess, getAllOrders, getOrder])

  useEffect(() => {
    if (isSuccessCode) {
      getOrder()
    }
  }, [isSuccessCode, getOrder])

  useEffect(() => {
    if (isSuccess) {
      getOrderStatus()
    }
  }, [isSuccess, getOrderStatus])

  const statusWatch = watch('status')

  const optionsExcept = optionsStatus.filter(
    (opt) => !statusException.includes(opt.value),
  )

  useEffect(() => {
    setIsShipping(statusWatch === 'shiped')
  }, [statusWatch])

  return (
    <FormStatusContainer>
      <Form as="form" onSubmit={handleSubmit(handleRegister)}>
        <Controller
          control={control}
          name="status"
          render={({ field: { onChange, name }, fieldState: { error } }) => {
            return (
              <SelectAdvanced
                options={optionsExcept}
                // isDisabled={disabled}
                error={error?.message as string}
                placeholder="Selecione um status"
                onChange={(data: any) => onChange(data.value)}
                name={name}

                // defaultValue={defaultValue}
              />
            )
          }}
        />

        {isShipping && (
          <TextInput
            placeholder="Código do rastreio"
            error={errors.tracking_code?.message}
            {...register('tracking_code')}
          />
        )}

        <Button type="submit" disabled={isSubmitting}>
          Atualizar
        </Button>
      </Form>
    </FormStatusContainer>
  )
}
