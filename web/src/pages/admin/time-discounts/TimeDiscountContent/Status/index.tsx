import { useCallback } from 'react'
import { StatusContainer } from './styles'
import { StatusTimeDiscount } from '@/pages/dtos/timeDiscount.dto'
import { Text } from '@lemonade-technologies-hub-ui/react'
import { statusTimeDiscount } from '../../utils/renderStatus'

interface StatusProps {
  status: StatusTimeDiscount
}

export default function Status({ status }: StatusProps) {
  const renderStatus = useCallback(() => {
    return statusTimeDiscount(status)
  }, [status])

  return (
    <StatusContainer status={status}>
      <div />
      <Text>{renderStatus()}</Text>
    </StatusContainer>
  )
}

