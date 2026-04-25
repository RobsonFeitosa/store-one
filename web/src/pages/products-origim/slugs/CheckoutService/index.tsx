import { DialogCloseCustom } from '@/components/DialogCloseCustom'
import {
  BtnFinish,
  BtnGoBack,
  CheckoutContent,
  CheckoutServiceContainer,
  DateScheduleText,
  TextTotal,
  WrapperPayment,
  WrapperProfessionalCheck,
  SuccessContainer,
  SuccessTitle,
} from './styles'
import { Heading, Text } from '@lemonade-technologies-hub-ui/react'
import { IProductDTO } from '@/pages/dtos/product.dto'
import formatDate from '@/utils/formatDate'
import formatValue from '@/utils/formatValue'
import { useCreateOrder, useMutationProps } from '@/hooks/useCreateOrder'
import { OnPayment, PaymentMethod } from '@/pages/checkout/PaymentMethod'
import { useState } from 'react'
import { CouponDiscount } from '@/pages/checkout/index.page'
import DiscountCoupon from '@/pages/checkout/DiscountCoupon'
import { Option } from '@/dtos'
import { ArrowBendUpLeft, CheckCircle } from 'phosphor-react'
import { useAuth } from '@/hooks/providers/auth'

interface CheckoutServiceProps {
  professionalSelected: Option | null
  selectedDateTime: Date | null
  product: IProductDTO | null
  onClose: () => void
  onFinishCheckout: () => void
  onScheduleGoBack: () => void
}

export default function CheckoutService({
  product,
  selectedDateTime,
  professionalSelected,
  onClose,
  onFinishCheckout,
  onScheduleGoBack,
}: CheckoutServiceProps) {
  const { mutateAsync: createOrderAsync } = useCreateOrder()
  const [total, setTotal] = useState(product?.price)
  const [method, setMethod] = useState<OnPayment>('pix')
  const [couponDiscount, setCouponDiscount] = useState<CouponDiscount | null>()
  const [isFinished, setIsFinished] = useState(false)
  const { user } = useAuth()

  function applyDiscount(coupon: string, porcent: number) {
    const price = product?.price ?? 0
    const totalPorcent = (price * porcent) / 100
    setCouponDiscount({
      coupon,
      discount: totalPorcent,
    })

    setTotal(price - totalPorcent)
  }

  async function finishOrder() {
    if (product) {
      const schedullingDate = selectedDateTime?.toISOString()
      const payload: useMutationProps = {
        order: {
          products: [
            {
              productId: product.id,
              quantity: 1,
            },
          ],
          type_product: 'service',
          amount: Number(product?.price),
          payment_method: method ?? 'pix',
          tracking_code: null,
          professional_name: professionalSelected?.label,
          coupon_applied: couponDiscount
            ? {
                coupon: couponDiscount.coupon,
                discount: couponDiscount.discount,
              }
            : undefined,
        },
        scheduling: {
          date: schedullingDate ?? '',
          name: user?.name ?? 'Cliente',
          professional_id: professionalSelected?.value ?? '',
          product_id: product.id,
          observations: `Agendamento do serviço ${product.name} com o profissional ${professionalSelected?.label}.`,
        },
      }

      await createOrderAsync(payload).then(() => {
        setIsFinished(true)
      })
    }
  }

  function onTypeMethod(method: OnPayment) {
    setMethod(method)
  }

  function goBack() {
    onClose()
    onScheduleGoBack()
  }

  if (isFinished) {
    return (
      <CheckoutServiceContainer>
        <DialogCloseCustom onClose={onClose} />
        <SuccessContainer>
          <CheckCircle size={80} weight="fill" />
          <SuccessTitle>Parabéns!</SuccessTitle>
          <Text size="lg">
            Seu agendamento foi realizado com sucesso.
          </Text>
          <Text color="gray500">
            Seu pagamento foi aprovado, seu agendamento foi marcado e você receberá uma confirmação por e-mail.
          </Text>
          <BtnFinish onClick={onClose} style={{ marginTop: '2rem' }}>
            Concluído
          </BtnFinish>
        </SuccessContainer>
      </CheckoutServiceContainer>
    )
  }

  return (
    <CheckoutServiceContainer>
      <DialogCloseCustom onClose={onClose} />
      <Heading as="h2">Checkout</Heading>

      <CheckoutContent>
        <WrapperProfessionalCheck>
          <Text>
            <Text as="span" color="gray500">Profissional:</Text> {professionalSelected?.label}
          </Text>

          <BtnGoBack onClick={goBack}>
            Voltar
            <ArrowBendUpLeft size={16} />
          </BtnGoBack>
        </WrapperProfessionalCheck>
        <Text>
          <Text as="span" color="gray500">Serviço:</Text> {product?.name}
        </Text>
        <Text>
          <Text as="span" color="gray500">Valor:</Text> {formatValue(product?.price ?? 0)}
        </Text>
        <Text>
          <Text as="span" color="gray500">Local de encontro:</Text> <Text as="strong">Endereço da empresa</Text>
        </Text>
      </CheckoutContent>

      <DateScheduleText>
        <div className='!text-2xl'> 
          Agendamento:{' '}
          <strong>
            {formatDate({
              date: selectedDateTime?.toString() ?? '',
              hoursView: true,
            })}
            h
          </strong>
        </div>
      </DateScheduleText>

      <DiscountCoupon onApplyDiscount={applyDiscount} />

      <WrapperPayment>
        <Heading as="h4">Forma de pagamento</Heading>
        <PaymentMethod method={method} onTypeMethod={onTypeMethod} />
      </WrapperPayment>

      <TextTotal as="strong">
        Total do pedido: {formatValue(total ?? 0)}
      </TextTotal>

      <BtnFinish onClick={finishOrder}>Fechar pedido</BtnFinish>
    </CheckoutServiceContainer>
  )
}
