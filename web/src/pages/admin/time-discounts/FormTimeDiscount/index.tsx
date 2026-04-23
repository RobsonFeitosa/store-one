/* eslint-disable react-hooks/exhaustive-deps */
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormTimeDiscountContainer, WrapperDate } from './styls'
import { Controller, useForm } from 'react-hook-form'
import {
  ITimeDiscountDTO,
  OptionProductsTimeDiscount,
  StatusTimeDiscount,
} from '@/pages/admin/dtos/timeDiscount.dto'
import { DialogCloseCustom } from '@/components/DialogCloseCustom'
import DatePicker, { registerLocale } from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'
import ptBr from 'date-fns/locale/pt-BR'

import {
  Button,
  SelectAdvanced,
  Text,
  TextInput,
} from '@lemonade-technologies-hub-ui/react'
import formatDate from '@/utils/formatDate'
import { useEffect, useMemo } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Option } from '@/dtos'
import { useCreateTimeDiscount } from '../../hooks/useCreateTimeDiscount'
import { useUpdateTimeDiscount } from '../../hooks/useUpdateTimeDiscount'
registerLocale('ptBR', ptBr)

const optionsExcept = [
  {
    label: 'Ativo',
    value: 'actived',
  },
  {
    label: 'Cancelado',
    value: 'cancel',
  },
  {
    label: 'Completo',
    value: 'complete',
  },
  {
    label: 'Parado',
    value: 'idle',
  },
]

const timeDiscountForm = z
  .object({
    discount: z.number().min(0, 'Minímo 0%').max(100, 'Máximo 100%'),
    status: z.string(),
    startDate: z.date().min(new Date(), {
      message: 'Essa data já passou, dever ser uma data a partir do dia atual',
    }),
    endDate: z.date(),
    productIds: z
      .array(z.string())
      .min(1, 'É necessário no minímo 1 produto selecionado'),
  })
  .refine((data) => data.endDate > data.startDate, {
    message: 'A data inicial deve ser anterior a data final',
    path: ['endDate'],
  })

export type TimeDiscountFormData = z.infer<typeof timeDiscountForm>

interface FormTimeDiscountProps {
  onClose: () => void
  onRefetch: () => void
  optionsProducts?: OptionProductsTimeDiscount[]
  timeDiscount?: ITimeDiscountDTO
}
export default function FormTimeDiscount({
  onClose,
  onRefetch,
  optionsProducts,
  timeDiscount,
}: FormTimeDiscountProps) {
  const options = useMemo(() => {
    const opt =
      timeDiscount &&
      timeDiscount?.products.map((product) => ({
        label: product.name,
        value: product.id,
      }))

    if (opt) {
      const options = optionsProducts ? opt.concat(optionsProducts) : []

      const values = options.map(({ value }) => value)
      const filtered = options.filter(
        ({ value }, index) => !values.includes(value, index + 1),
      )

      return filtered
    }

    return optionsProducts ?? []
  }, [optionsProducts, timeDiscount])

  const {
    handleSubmit,
    register,
    setValue,
    watch,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<TimeDiscountFormData>({
    resolver: zodResolver(timeDiscountForm),
    defaultValues: {
      discount: timeDiscount?.discount,
      status: timeDiscount?.status,
    },
  })

  const { isSuccess: isSuccessUpdate, mutateAsync: updateTimeDiscount } =
    useUpdateTimeDiscount(String(timeDiscount?.id))

  const { isSuccess: isSuccessCreate, mutateAsync: createTimeDiscount } =
    useCreateTimeDiscount()

  async function handleRegister(data: TimeDiscountFormData) {
    const hasTimeDiscout = timeDiscount
    const payload = {
      ...data,
      status: data.status as StatusTimeDiscount,
    }

    if (hasTimeDiscout) {
      await updateTimeDiscount(payload)
    } else {
      await createTimeDiscount(payload)
    }
  }

  function onChangeStartDate(data: Date) {
    setValue('startDate', data)
  }

  function onChangeEndDate(data: Date) {
    setValue('endDate', data)
  }

  const status = watch('status')
  const startDate = watch('startDate')
  const endDate = watch('endDate')

  function refetchAll() {
    onRefetch()
    onClose()
  }

  useEffect(() => {
    if (isSuccessCreate) {
      refetchAll()
      reset()
    }
  }, [isSuccessCreate])

  useEffect(() => {
    if (isSuccessUpdate) {
      refetchAll()
    }
  }, [isSuccessUpdate])

  useEffect(() => {
    timeDiscount?.startDate &&
      setValue('startDate', new Date(timeDiscount.startDate))
    timeDiscount?.endDate && setValue('endDate', new Date(timeDiscount.endDate))
    setValue('status', status ?? 'actived')

    const productIds = timeDiscount?.products.map((p) => String(p.id))
    productIds && productIds?.length > 0 && setValue('productIds', productIds)
  }, [timeDiscount])

  return (
    <>
      <DialogCloseCustom onClose={onClose} />
      <FormTimeDiscountContainer>
        <Form as="form" onSubmit={handleSubmit(handleRegister)}>
          <Row>
            <Col sm={6} md={6} lg={6}>
              <WrapperDate>
                <Text>Data início</Text>

                <div>
                  <DatePicker
                    onChange={onChangeStartDate}
                    showTimeSelect
                    selected={startDate}
                    locale="ptBR"
                    dateFormat="Pp"
                  />
                  <TextInput
                    size="sm"
                    placeholder="Data início"
                    error={errors.startDate?.message}
                    {...register('startDate')}
                    value={
                      startDate
                        ? `${formatDate({
                            date: startDate,
                            hoursView: true,
                          })}h`
                        : undefined
                    }
                    disabled={!!startDate}
                  />
                </div>
              </WrapperDate>
            </Col>
            <Col sm={6} md={6} lg={6}>
              <WrapperDate>
                <Text>Data Final</Text>

                <div>
                  <DatePicker
                    onChange={onChangeEndDate}
                    showTimeSelect
                    selected={endDate}
                    locale="ptBR"
                    dateFormat="Pp"
                  />
                  <TextInput
                    size="sm"
                    placeholder="Data final"
                    error={errors.endDate?.message}
                    {...register('endDate')}
                    value={
                      endDate
                        ? `${formatDate({ date: endDate, hoursView: true })}h`
                        : undefined
                    }
                    disabled={!!endDate}
                  />
                </div>
              </WrapperDate>
            </Col>
          </Row>
          <TextInput
            size="sm"
            placeholder="Desconto (%)"
            error={errors.discount?.message}
            {...register('discount', {
              valueAsNumber: true,
            })}
          />
          <Controller
            control={control}
            name="status"
            render={({ field: { onChange, name } }) => {
              return (
                <SelectAdvanced
                  options={optionsExcept}
                  error={errors?.status?.message as string}
                  placeholder="Selecione um status"
                  onChange={(data: any) => onChange(data.value)}
                  name={name}
                  value={optionsExcept.find((opt) => opt.value === status)}
                />
              )
            }}
          />
          <Controller
            control={control}
            name="productIds"
            render={({ field: { onChange, name } }) => {
              return (
                <SelectAdvanced
                  options={options}
                  isMulti
                  error={errors?.productIds?.message as string}
                  placeholder="Selecione os produtos"
                  onChange={(data: any) => {
                    onChange(data.map((d: Option) => d.value))
                  }}
                  name={name}
                  defaultValue={timeDiscount?.products.map((product) => ({
                    value: product.id,
                    label: product.name,
                  }))}
                />
              )
            }}
          />
          <Button size="sm" type="submit" disabled={isSubmitting}>
            Salvar
          </Button>
        </Form>
      </FormTimeDiscountContainer>
    </>
  )
}

