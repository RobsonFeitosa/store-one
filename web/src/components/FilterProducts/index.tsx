import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Slider, Text, TextInput } from '@lemonade-technologies-hub-ui/react'
import { Controller, useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import formatValue from '@/utils/formatValue'
import { DialogCloseCustom } from '../DialogCloseCustom'
import { useRouter } from 'next/router'
import { MdFilterAltOff } from 'react-icons/md'

import {
  BtnButton,
  BtnButtonClean,
  BtnsWrapper,
  FilterProductsContainer,
  Form,
  PriceWeight,
  PriceWrapper,
  PriceWrapperBox,
} from './styles'

const maxSlider = 11500

export function isEmpty(variable: string | number | undefined) {
  return variable === undefined || variable === null || variable === 0
}

const filterForm = z.object({
  name: z.string().optional(),
  quantity: z.coerce.number().optional().nullable(),
  weight: z.coerce.number().optional().nullable(),
  price: z.array(z.number()).optional(),
})

export type FilterFormData = z.infer<typeof filterForm>

interface FilterProductsProps {
  type: string
  onClose: () => void
}

export default function FilterProducts({ type, onClose }: FilterProductsProps) {
  const router = useRouter()

  const name = router.query.name ? String(router.query.name) : undefined
  const quantity = router.query.quantity
    ? Number(router.query.quantity)
    : undefined
  const weight = router.query.weight ? Number(router.query.weight) : undefined
  const priceMin = router.query.priceMin
    ? Number(router.query.priceMin)
    : undefined
  const priceMax = router.query.priceMax
    ? Number(router.query.priceMax)
    : undefined

  const [sliderCurrent, setSliderCurrent] = useState<number[]>([
    priceMin ?? 0,
    priceMax ?? maxSlider,
  ])

  const {
    handleSubmit,
    control,
    register,
    setValue,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<FilterFormData>({
    resolver: zodResolver(filterForm),
    defaultValues: {
      name,
      quantity,
      weight,
    },
  })

  const label = type === 'product' ? 'products' : 'services'

  async function handleRegister(data: FilterFormData) {
    router.push({
      pathname: `/${label}`,
      query: {
        ...(!isEmpty(data.name) && { name: data.name }),
        ...(!isEmpty(data.quantity as number) && { quantity: data.quantity }),
        ...(!isEmpty(data.weight as number) && { weight: data.weight }),
        ...(data.price && {
          priceMin: data.price && data.price[0],
        }),
        ...(!isEmpty(data.price && data.price[1]) && {
          priceMax: data.price && data.price[1],
        }),
        type,
      },
    })
    onClose()
  }
  function handleSlider(value: number[]) {
    setSliderCurrent(value)
  }

  const hasQuery = Object.keys(router.query).length > 0

  function handleCleanFilter() {
    reset(
      { name: '', quantity: null, weight: null, price: [0, maxSlider] },
      { keepValues: false },
    )
    router.push(`/${label}`)
    setSliderCurrent([0, maxSlider])
  }

  useEffect(() => {
    if (priceMin && priceMax) {
      setValue('price', [priceMin, priceMax])
    }
  }, [priceMin, priceMax, setValue])

  const labelValue = type === 'product' ? 'produto' : 'serviço'

  return (
    <FilterProductsContainer>
      <DialogCloseCustom onClose={onClose} />

      <Form as="form" onSubmit={handleSubmit(handleRegister)}>
        <div>
          <Text as="span">Nome</Text>
          <TextInput
            size="sm"
            placeholder={`Nome do ${labelValue}`}
            error={errors.name?.message}
            {...register('name')}
          />
        </div>

        <PriceWrapperBox>
          <Controller
            control={control}
            name={`price`}
            render={({ field: { onChange } }) => {
              return (
                <>
                  <Text as="span">Preço</Text>
                  <Slider
                    defaultValue={[priceMin ?? 0, priceMax ?? maxSlider]}
                    max={maxSlider}
                    value={sliderCurrent}
                    step={2}
                    onValueChange={(value) => {
                      onChange(value)
                      handleSlider(value)
                    }}
                    hasFullOut
                  />
                  <PriceWrapper>
                    <Text>Min. {formatValue(sliderCurrent[0])}</Text>
                    <Text>Max. {formatValue(sliderCurrent[1])}</Text>
                  </PriceWrapper>
                </>
              )
            }}
          />
        </PriceWrapperBox>

        {type === 'product' && (
          <PriceWeight>
            <div>
              <Text as="span">Quantidade</Text>
              <TextInput
                size="sm"
                type="number"
                placeholder="Quantidade do produto"
                error={errors.quantity?.message}
                {...register('quantity')}
              />
            </div>

            <div>
              <Text as="span">Peso</Text>
              <TextInput
                size="sm"
                type="number"
                placeholder="Peso do produto"
                error={errors.weight?.message}
                {...register('weight')}
              />
            </div>
          </PriceWeight>
        )}

        <BtnsWrapper>
          <BtnButton
            size="sm"
            type="submit"
            disabled={isSubmitting || !isDirty}
          >
            Pesquisar
          </BtnButton>

          <BtnButtonClean
            size="sm"
            type="button"
            disabled={isSubmitting || !hasQuery}
            onClick={handleCleanFilter}
          >
            <MdFilterAltOff size={18} />
            limpar
          </BtnButtonClean>
        </BtnsWrapper>
      </Form>
    </FilterProductsContainer>
  )
}
