import { SelectAdvanced, Text } from '@lemonade-technologies-hub-ui/react'
import { SwitchTypesContainer } from './styles'
import { useCallback } from 'react'

export interface Option {
  label: string
  value: string
}

const optionsTypes = [
  {
    label: 'Simples',
    value: 'single',
  },
  {
    label: 'Variante',
    value: 'multiple',
  },
]

interface SwitchTypesProps {
  type: string | undefined
  value: string
  name: string
  error: string | undefined
  onChangeSwitchType: (optionType: Option) => void
}

export default function SwitchTypes({
  type,
  error,
  value,
  name,
  onChangeSwitchType,
}: SwitchTypesProps) {
  const label = type === 'product' ? 'produto' : 'serviço'

  const SwitchTypeRender = useCallback(() => {
    return (
      <SelectAdvanced
        onChange={(e: any) => onChangeSwitchType(e)}
        options={optionsTypes}
        defaultValue={optionsTypes.find((option) => option.value === type)}
        error={error}
        name={name}
        value={optionsTypes.find((opt) => opt.value === value)}
        // isDisabled={disabled}
        placeholder="Selecione o tipo de produto"
        isClearable={false}
      />
    )
  }, [type, onChangeSwitchType, value, error, name])

  return (
    <SwitchTypesContainer>
      <Text>Selecione o tipo de {label}</Text>
      <SwitchTypeRender />
    </SwitchTypesContainer>
  )
}


