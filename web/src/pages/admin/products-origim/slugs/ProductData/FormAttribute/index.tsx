import { Control, Controller, useFieldArray } from 'react-hook-form'
import {
  AttributesContent,
  AttributesValue,
  AttributesWrapper,
  BtnRemoveAttr,
  BtnVariation,
  FormAttributeContainer,
  VariationsWrapper,
} from './styles'

import { z } from 'zod'
import { Text, TextInput } from '@lemonade-technologies-hub-ui/react'

import { useEffect, useState } from 'react'
import { Option } from '@/dtos'
import { ArrowRight } from 'phosphor-react'
import { useToast } from '@/hooks/providers/toast'
import { useDeleteVariation } from '../../hooks/useDeleteVariation'
import { AttributesFormData } from '../..'

export interface IProductAttributesDTO {
  name: string
  options: Option[]
}

const attributeForm = z.object({
  name: z.string(),
  options: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
    }),
  ),
})

export type AttributeFormData = z.infer<typeof attributeForm>

interface deletes {
  attributeId: string
  variationId: string
}

interface FormAttributeProps {
  index: number
  attributes: AttributesFormData
  control: Control<any>
}

export default function FormAttribute({
  index,
  control,
  attributes,
}: FormAttributeProps) {
  const [disabled, setDisabled] = useState(true)
  const { append, remove } = useFieldArray({
    control,
    name: `attributes.${index}.options`,
  })

  const [deletes, setDeletes] = useState<deletes | null>(null)

  const { append: appendVar, remove: removeVar } = useFieldArray({
    control,
    name: `attributes.${index}.variations`,
  })

  function onAddOptions(option: Option) {
    append(option)
  }

  const { addToast } = useToast()

  const optionsValues =
    attributes &&
    attributes[index]?.options?.map((opt: Option) => String(opt.value))

  const { mutateAsync: deleteVariationAsync } = useDeleteVariation(
    deletes?.attributeId ?? '',
  )

  function handleAddVariationValue() {
    const input = document.querySelector(
      `#variant-value-${index}`,
    ) as HTMLInputElement

    if (input.value.length > 0) {
      const option = {
        label: input.value,
        value: input.value,
      }

      if (optionsValues?.includes(input.value)) {
        addToast({
          type: 'info',
          title: 'Variante já existe',
          description: 'Insira um nome diferente para o produto',
        })

        return
      }

      input.focus()

      onAddOptions(option)

      appendVar({
        name: option.value,
      })

      input.value = ''

      setDisabled(true)
    }
  }

  const options = attributes && attributes[index]?.options

  function onRemove(indexOpt: number) {
    remove(indexOpt)

    if (attributes) {
      setDeletes({
        attributeId: attributes[index]?.id ?? '',
        variationId: attributes[index]?.variations[indexOpt].id ?? '',
      })
    }
    removeVar(indexOpt)
  }

  function onChangeInput() {
    setDisabled(false)
  }

  useEffect(() => {
    if (deletes?.variationId) {
      deleteVariationAsync(deletes?.variationId)
    }
  }, [deletes, deleteVariationAsync])

  return (
    <FormAttributeContainer>
      <VariationsWrapper>
        <Text>Nome</Text>
        <Controller
          control={control}
          name={`attributes.${index}.name`}
          render={({
            field: { onChange, name, value, ref },
            fieldState: { error },
          }) => {
            return (
              <TextInput
                onChange={(e) => {
                  onChange(e.target.value)
                }}
                size="sm"
                value={value}
                error={error?.message}
                name={name}
                ref={ref}
                placeholder={
                  attributes && attributes?.length === 1
                    ? 'Ex.: cores'
                    : 'Nome do atributo'
                }
              />
            )
          }}
        />
      </VariationsWrapper>

      <AttributesContent>
        <AttributesWrapper>
          <Text>Valor</Text>
          <TextInput
            size="sm"
            placeholder="Valor"
            id={`variant-value-${index}`}
            onChange={onChangeInput}
          />

          <BtnVariation
            type="button"
            size="sm"
            onClick={handleAddVariationValue}
            disabled={disabled}
          >
            <ArrowRight />
          </BtnVariation>
        </AttributesWrapper>

        <AttributesValue>
          {options?.map((option: Option, index: number) => (
            <BtnRemoveAttr
              onClick={() => onRemove(index)}
              key={option.value}
              type="button"
              title="remover"
            >
              <Text>{option.label}</Text>
            </BtnRemoveAttr>
          ))}
        </AttributesValue>
      </AttributesContent>
    </FormAttributeContainer>
  )
}


