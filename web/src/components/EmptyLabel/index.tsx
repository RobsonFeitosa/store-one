import { Text } from '@lemonade-technologies-hub-ui/react'

import { EmptyLabelContainer } from './styles'
import { useMemo } from 'react'

interface EmptyLabelProps {
  label: string
  female?: boolean
}

export default function EmptyLabel({ label, female = false }: EmptyLabelProps) {
  const labelFemale = useMemo(() => {
    return female ? 'a' : ''
  }, [female])

  return (
    <EmptyLabelContainer>
      <Text>
        Nenhum{labelFemale} {label} foi encontrado
      </Text>
    </EmptyLabelContainer>
  )
}
