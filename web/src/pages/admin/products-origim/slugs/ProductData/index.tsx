import { Heading } from '@lemonade-technologies-hub-ui/react'
import { ProductDataContainer, ProductDataContent } from './styles'
import { Control, Controller } from 'react-hook-form'
import ProductVariations from './ProductVariations'
import { useEffect, useState } from 'react'
import SwitchTypes from './SwitchTypes'
import { Option } from '@/dtos'
import Variation from './ProductVariations/Variation'
import { AttributesFormData } from '../types'

export type ProductType = 'single' | 'multiple' | null

interface ProductDataProps {
  productId: string
  modeData: string | undefined
  attributes: AttributesFormData
  control: Control<any>
  typeProduct: string
}

export default function ProductData({
  productId,
  modeData,
  attributes,
  control,
  typeProduct,
}: ProductDataProps) {
  const [type, setType] = useState<string | undefined>(modeData)

  function onChangeSwitch(optionType: Option) {
    setType(optionType.value)
  }

  useEffect(() => {
    if (modeData) {
      setType(modeData)
    }

    return () => {
      setType('single')
    }
  }, [modeData])

  const label = typeProduct === 'product' ? 'produto' : 'serviço'

  return (
    <ProductDataContainer>
      <Heading as="h4">Dados do {label}</Heading>

      <Controller
        control={control}
        name="mode_data"
        render={({
          field: { onChange, value, name },
          fieldState: { error },
        }) => {
          return (
            <SwitchTypes
              type={type}
              name={name}
              error={error?.message}
              onChangeSwitchType={(data) => {
                onChange(data.value)
                onChangeSwitch(data)
              }}
              value={value}
            />
          )
        }}
      />

      <hr />

      {type && (
        <ProductDataContent>
          {type === 'single' ? (
            <Variation
              control={control}
              type={type}
              typeProduct={typeProduct}
            />
          ) : (
            <ProductVariations
              productId={productId}
              control={control}
              attributes={attributes}
              type={type}
              typeProduct={typeProduct}
            />
          )}
        </ProductDataContent>
      )}

      {type === 'single' && <hr />}
    </ProductDataContainer>
  )
}


