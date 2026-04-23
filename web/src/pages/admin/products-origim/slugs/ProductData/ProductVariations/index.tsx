import { Heading, Text } from '@lemonade-technologies-hub-ui/react'
import { FaSquarePlus } from 'react-icons/fa6'
import { Control, useFieldArray } from 'react-hook-form'
import { MinusCircle } from 'phosphor-react'
import Variation from './Variation'
import FormAttribute from '../FormAttribute'
import { Option } from '@/dtos'
import { IVariationDTO } from '@/pages/admin/dtos/variation.dto'
import { AttributesFormData } from '../..'

import {
  BtnAttributes,
  BtnRemoveAttribute,
  ProductVariationContent,
  ProductVariationHeader,
  ProductVariationSingle,
  ProductVariationsContainer,
  VariationsContent,
  VariationsList,
  VariationsWrapper,
} from './styles'
import VariationCollapse from './VariationCollapse'

interface Attribute {
  name: string
  options: Option
  variations: IVariationDTO[]
}

interface ProductVariationsProps {
  productId: string
  type: string
  typeProduct: string
  control: Control<any>
  attributes: AttributesFormData
}
export default function ProductVariations({
  productId,
  control,
  attributes,
  typeProduct,
  type,
}: ProductVariationsProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'attributes',
  })

  function handleAddNewAttributes() {
    append({} as Attribute)
  }

  const lastAttributeOptions =
    attributes && attributes[attributes?.length - 1]?.options

  const isAddEnableLast =
    (lastAttributeOptions && lastAttributeOptions.length > 0) ||
    attributes?.length === 0

  return (
    <ProductVariationsContainer>
      <ProductVariationHeader>
        <Heading as="h4">Adicionar atributo</Heading>
        <BtnAttributes
          onClick={handleAddNewAttributes}
          disabled={!isAddEnableLast}
          title="Adicionar"
        >
          <FaSquarePlus size={20} />
        </BtnAttributes>
      </ProductVariationHeader>
      {fields.length > 0 && (
        <ProductVariationContent>
          {fields.map((field, index) => (
            <ProductVariationSingle key={field.id}>
              <FormAttribute
                control={control}
                attributes={attributes}
                index={index}
              />

              <BtnRemoveAttribute onClick={() => remove(index)}>
                <MinusCircle />
              </BtnRemoveAttribute>
            </ProductVariationSingle>
          ))}
        </ProductVariationContent>
      )}
      <hr />
      {attributes &&
        attributes.length > 0 &&
        attributes[0].options?.length > 0 && (
          <VariationsContent>
            {attributes[0].options?.length > 0 && (
              <Heading as="h4">Variantes</Heading>
            )}
            {attributes.map((attribute, indexAtt) => (
              <VariationsWrapper key={attribute?.name}>
                {attribute?.options && attribute.options?.length > 0 && (
                  <Text as="strong">{attribute?.name}</Text>
                )}
                <VariationsList>
                  {attribute?.options?.map((option, index) => (
                    <div key={option.value}>
                      <VariationCollapse option={option}>
                        <Variation
                          typeProduct={typeProduct}
                          productId={productId}
                          control={control}
                          indexAtt={indexAtt}
                          indexOpt={index}
                          type={type}
                        />
                      </VariationCollapse>
                    </div>
                  ))}
                </VariationsList>
              </VariationsWrapper>
            ))}
          </VariationsContent>
        )}
    </ProductVariationsContainer>
  )
}


