import { Text } from '@lemonade-technologies-hub-ui/react'
import { builderStatusNamed } from '@/pages/utils/builderLastStatus'
import formatDate from '@/utils/formatDate'
import FormStatus from './FormStatus'
import { useEffect } from 'react'
import { useGetAllStatusByOrder } from '@/hooks/useGetAllStatusByOrder'

import {
  OrderStatusContainer,
  OrderStatusContent,
  OrderStatusList,
  OrderStatusListContent,
} from './styles'
import { IPaginationOptionDTO } from '@/pages/dtos/paginationOption.dto'

interface OrderStatusProps {
  orderId: string
  trackingCode: string | null
  optionsPage: IPaginationOptionDTO
}

export default function OrderStatus({
  orderId,
  trackingCode,
  optionsPage,
}: OrderStatusProps) {
  const { data: statusList, refetch: getOrderStatus } =
    useGetAllStatusByOrder(orderId)

  useEffect(() => {
    getOrderStatus()
  }, [getOrderStatus])

  const [status] = statusList ?? []

  const statusException = status?.map((status) => status.name) ?? []

  return (
    <OrderStatusContainer>
      <FormStatus
        orderId={orderId}
        statusException={statusException}
        optionsPage={optionsPage}
      />

      <OrderStatusList>
        <Text as="strong" size="xs">
          Últimas atualizacões
        </Text>

        <OrderStatusListContent>
          {status && status.length > 0 ? (
            status?.map((status) => (
              <OrderStatusContent key={status.id}>
                <Text size="xs">
                  {formatDate({ date: status.created_at, hoursView: true })}
                </Text>
                {trackingCode && status.name === 'shiped' && (
                  <Text size="xs">{trackingCode}</Text>
                )}
                <Text size="xs">{builderStatusNamed(status.name)}</Text>
              </OrderStatusContent>
            ))
          ) : (
            <Text size="xs">Nenhuma status informado</Text>
          )}
        </OrderStatusListContent>
      </OrderStatusList>
    </OrderStatusContainer>
  )
}
