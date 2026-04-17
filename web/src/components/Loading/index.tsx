import { Text } from '@lemonade-technologies-hub-ui/react'
import { FaSpinner } from 'react-icons/fa'

import { LoadingContainer } from './styles'

export function Loading() {
  return (
    <LoadingContainer>
      <Text>Carregando</Text>
      <FaSpinner size={18} />
    </LoadingContainer>
  )
}
