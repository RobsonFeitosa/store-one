import { DialogCloseCustom } from '@/components/DialogCloseCustom'
import { SimulatePaymentContainer } from './styles'
import { Text } from '@lemonade-technologies-hub-ui/react'
import Link from 'next/link'

interface SimulatePaymentProps {
  onClose: () => void
}

export default function SimulatePayment({ onClose }: SimulatePaymentProps) {
  return (
    <SimulatePaymentContainer>
      <DialogCloseCustom onClose={() => onClose()} />
      <Text size={'lg'}>Simulação de pagamento concluído</Text>

      <Text size={'sm'}>
        Vejas os pedidos realizado na área aministrativa,{' '}
        <Link
          href={`${process.env.NEXT_PUBLIC_URL_ADMIN}/orders`}
          target="_blank"
          rel="noreferrer"
        >
          clique aqui
        </Link>
      </Text>
    </SimulatePaymentContainer>
  )
}
