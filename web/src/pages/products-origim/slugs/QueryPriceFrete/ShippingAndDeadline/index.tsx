import { Text } from '@lemonade-technologies-hub-ui/react'
import { Description, ShippingAndDeadlineContainer } from './styles'

import { DialogCloseCustom } from '@/components/DialogCloseCustom'

interface ShippingAndDeadlineProps {
  onClose: () => void
}

export default function ShippingAndDeadline({
  onClose,
}: ShippingAndDeadlineProps) {
  return (
    <ShippingAndDeadlineContainer>
      <DialogCloseCustom onClose={onClose} />

      <div>
        <Text>Entrega padrão</Text>

        <Description>
          <div>
            <Text>R$ 49.90</Text>
            <Text>Até 8 dias úteis</Text>
          </div>
        </Description>
      </div>
      <div>
        <Text>Sedex</Text>

        <Description>
          <div>
            <Text>R$ 65.30</Text>
            <Text>Até 1 dias úteis</Text>
          </div>
        </Description>
      </div>
    </ShippingAndDeadlineContainer>
  )
}
