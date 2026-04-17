import { Button, Text, TextInput } from '@lemonade-technologies-hub-ui/react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { DiscountCouponContainer, DiscountCouponContent, Form } from './styles'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { WrapperCoupon } from '../ProductsCheckout/styles'
import { useVerifyCoupon } from '@/hooks/useVerifyCoupon'

const couponForm = z.object({
  coupon: z.string(),
})

export type CouponFormData = z.infer<typeof couponForm>

interface DiscountCouponProps {
  onApplyDiscount: (coupon: string, porcent: number) => void
}

export default function DiscountCoupon({
  onApplyDiscount,
}: DiscountCouponProps) {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<CouponFormData>({
    resolver: zodResolver(couponForm),
  })

  const { data: dataDiscount, mutateAsync: verifyCouponAsync } =
    useVerifyCoupon()

  async function handleRegister(data: CouponFormData) {
    await verifyCouponAsync(data.coupon)
  }

  const isAvailable = dataDiscount?.data.status === 'available'

  useEffect(() => {
    if (dataDiscount?.data && isAvailable) {
      onApplyDiscount(dataDiscount.data.code_coupon, dataDiscount.data.discount)
    }
  }, [dataDiscount, onApplyDiscount, isAvailable])

  return (
    <DiscountCouponContainer>
      {/* <Heading as="h3">Aplicar desconto</Heading> */}

      <DiscountCouponContent>
        <Form as="form" onSubmit={handleSubmit(handleRegister)}>
          <TextInput
            placeholder="Insira um cupom"
            error={errors.coupon?.message}
            {...register('coupon')}
          />

          <Button type="submit" disabled={isSubmitting}>
            Aplicar
          </Button>
        </Form>
      </DiscountCouponContent>

      {dataDiscount && isAvailable && (
        <WrapperCoupon>
          <Text>Cupom: {dataDiscount?.data.code_coupon}</Text>
          <Text>Desconto aplicado: {dataDiscount?.data.discount}%</Text>
        </WrapperCoupon>
      )}
    </DiscountCouponContainer>
  )
}
