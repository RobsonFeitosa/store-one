import { IOrderDTO } from '@/pages/dtos/orders.dto'
import OrderModal from './OrderModal'
import { Dialog, DialogRoot, Text } from '@lemonade-technologies-hub-ui/react'
import { useCallback, useState } from 'react'
import { builderStatusNamed } from '@/pages/utils/builderLastStatus'
import { CheckSquareOffset, DotsThreeVertical, Download } from 'phosphor-react'
import { OrderSingleHeader } from './OrderModal/styles'
import { useOutsideClick } from '@/hooks/useOutsideClick'

import {
  Actions,
  ActionsContent,
  BtnAction,
  BtnShowActions,
  OrdersSingleContainer,
} from './styles'

interface OrdersSingleProps {
  order: IOrderDTO
}

export default function OrderSingle({ order }: OrdersSingleProps) {
  const [openModal, setOpenModal] = useState(false)
  const [showActions, setShowActions] = useState(false)

  const statusLabel = useCallback((status: string) => {
    return builderStatusNamed(status)
  }, [])

  function downloadNFE() {
    // console.log('download')
  }

  function handleShowProductsOrder() {
    setOpenModal(true)
  }

  const refBtnActions = useOutsideClick(() => {
    setShowActions(false)
  })

  function handleShowActions() {
    setShowActions(!showActions)
  }

  return (
    <>
      <DialogRoot open={openModal}>
        <Dialog offClosed title="Produtos">
          <OrderModal
            onClose={() => setOpenModal(false)}
            productsOrder={order.orders_products}
          />
        </Dialog>
      </DialogRoot>

      <OrdersSingleContainer>
        <OrderSingleHeader>
          <div>
            <Text as="strong">Código do pedido: {order.cod_order}</Text>
            <Text>
              Situação:{' '}
              {order.status && order.status?.length > 0
                ? statusLabel(order.status[order.status.length - 1]?.name)
                : 'Pendente'}
            </Text>
          </div>
        </OrderSingleHeader>

        <Actions ref={refBtnActions}>
          <BtnShowActions onClick={handleShowActions}>
            <DotsThreeVertical size={33} />
          </BtnShowActions>

          <ActionsContent actived={showActions}>
            <BtnAction onClick={handleShowProductsOrder}>
              <CheckSquareOffset size={20} />
              Ver produtos
            </BtnAction>
            <BtnAction onClick={downloadNFE}>
              <Download size={20} />
              Baixar nota fiscal
            </BtnAction>
          </ActionsContent>
        </Actions>
      </OrdersSingleContainer>
    </>
  )
}
