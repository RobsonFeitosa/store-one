import { DialogCloseCustom } from '@/components/DialogCloseCustom'
import { FinishPaymentContainer } from './styles'
import { OnPayment } from '../PaymentMethod'
import { PixModal } from '@/components/PixModal'

interface FinishPaymentProps {
  method: OnPayment
  onClose: () => void
}

export default function FinishPayment({ method, onClose }: FinishPaymentProps) {
  return (
    <FinishPaymentContainer>
      <DialogCloseCustom onClose={onClose} />

      {method === 'pix' && <PixModal onClose={onClose} />}
    </FinishPaymentContainer>
  )
}
