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
import { ArrowBendUpLeft } from 'phosphor-react'

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
          name: 'Encontro',
          professional_id: professionalSelected?.value ?? '',
          observations: 'O encontro deverar ocorrer na empresa combinada',
        },
      }

      await createOrderAsync(payload).finally(() => {
        onFinishCheckout()
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

  return (
    <CheckoutServiceContainer>
      <DialogCloseCustom onClose={onClose} />

      <CheckoutContent>
        <WrapperProfessionalCheck>
          <Text>Profissional: {professionalSelected?.label}</Text>

          <BtnGoBack onClick={goBack}>
            Voltar
            <ArrowBendUpLeft size={16} />
          </BtnGoBack>
        </WrapperProfessionalCheck>
        <Text>Serviço: {product?.name}</Text>
        <Text>Valor: {formatValue(product?.price ?? 0)}</Text>
        <Text>
          Local de encontro: <Text as="strong">Endereço da empresa</Text>
        </Text>
      </CheckoutContent>

      <DateScheduleText size={'lg'}>
        Agendamento:{' '}
        {formatDate({
          date: selectedDateTime?.toString() ?? '',
          hoursView: true,
        })}
        h
      </DateScheduleText>

      <DiscountCoupon onApplyDiscount={applyDiscount} />

      <WrapperPayment>
        <Heading as="h4">Forma de pagamento</Heading>
        <PaymentMethod method={method} onTypeMethod={onTypeMethod} />
      </WrapperPayment>

      <TextTotal size="lg" as="strong">
        Total do pedido: {formatValue(total ?? 0)}
      </TextTotal>

      <BtnFinish onClick={finishOrder}>Fechar pedido</BtnFinish>
    </CheckoutServiceContainer>
  )
}
