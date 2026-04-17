import { SelectAdvanced, Text } from '@lemonade-technologies-hub-ui/react'
import { SelectInputContainer } from './styles'
import { Option } from '@/dtos'

interface SelectInputProps {
  label?: string
  placeholder: string
  error?: string
  name: string
  options: Option[]
  // value: Option
  disabled?: boolean
  defaultValue?: Option
  isMulti?: boolean
  closeMenuOnSelect?: boolean
  // selectedOption?: (option: Option) => void
  onChange?: (e: any) => void
}

export function SelectInput({
  label,
  placeholder,
  options,
  name,
  error,
  disabled = false,
  defaultValue,
  ...props
}: SelectInputProps) {
  return (
    <SelectInputContainer>
      {label && (
        <Text as="span" size="sm">
          {label}
        </Text>
      )}

      <SelectAdvanced
        options={options}
        name={name}
        isDisabled={disabled}
        error={error as string}
        {...props}
        placeholder={placeholder}
        defaultValue={defaultValue}
      />
    </SelectInputContainer>
  )
}
