import MainLayout from '@/components/components/Layout/Main'
import { Col, Container, Row } from 'react-bootstrap'
import {
  Button,
  Dialog,
  DialogRoot,
  Heading,
  Text,
} from '@lemonade-technologies-hub-ui/react'
import Address from './Address'
import DiscountCoupon from './DiscountCoupon'
import ProductsCheckout from './ProductsCheckout'
import { useEffect, useState } from 'react'
import { useOrder } from '@/hooks/providers/order'
import formatValue from '@/utils/formatValue'
import { OnPayment, PaymentMethod } from './PaymentMethod'
import { SummaryPayment } from './SummaryPayment'
import FinishPayment from './FinishPayment'
import { useCreateOrder } from '@/hooks/useCreateOrder'
import { IAddressDTO } from '../dtos/address.dto'
import SimulatePayment from './SimulatePayment'

import { CheckoutContainer, TotalOrder, WrapperCheckoutItem } from './style'

export interface CouponDiscount {
  coupon: string
  discount: number
}

export default function Checkout() {
  const [total, setTotal] = useState(0)
  const [method, setMethod] = useState<OnPayment>('pix')
  const [address, setAddress] = useState<IAddressDTO | null>(null)
  const [openPayment, setOpenPayment] = useState(false)
  const [openPayDone, setOpenPayDone] = useState(false)
  const [couponDiscount, setCouponDiscount] = useState<CouponDiscount | null>()
  const { order } = useOrder()

  const totalOrigin = order.items.reduce((acc, product) => {
    return acc + product.price * product.quantity
  }, 0)

  function applyDiscount(coupon: string, porcent: number) {
    const totalPorcent = (totalOrigin * porcent) / 100
    setCouponDiscount({
      coupon,
      discount: totalPorcent,
    })
    setTotal(totalOrigin - totalPorcent)
  }

  useEffect(() => {
    setTotal(totalOrigin)
  }, [totalOrigin])

  function onAddress(data: IAddressDTO) {
    setAddress(data)
  }

  function onTypeMethod(method: OnPayment) {
    setMethod(method)
  }

  const { mutateAsync: createOrderAsync } = useCreateOrder()

  async function handleFinishPayment() {
    if (!address) {
      return
    }

    if (!method) {
      return
    }

    await createOrderAsync({
      order: {
        products: order.items.map((product) => {
          return {
            productId: product.id,
            quantity: product.quantity,
          }
        }),
        type_product: 'product',
        amount: total,
        address_id: address.id,
        payment_method: method,
        tracking_code: null,
        coupon_applied: couponDiscount
          ? {
              coupon: couponDiscount.coupon,
              discount: couponDiscount.discount,
            }
          : undefined,
        freight: {
          name: 'pac',
          value: 14,
        },
      },
    })

    setOpenPayDone(true)

    // setOpenPayment(true)
  }

  const hasAddress = !!address

  return (
    <>
      <DialogRoot open={openPayment}>
        <Dialog offClosed title="">
          <FinishPayment
            method={method}
            onClose={() => setOpenPayment(false)}
          />
        </Dialog>
      </DialogRoot>

      <DialogRoot open={openPayDone}>
        <Dialog offClosed title="">
          <SimulatePayment onClose={() => setOpenPayDone(false)} />
        </Dialog>
      </DialogRoot>

      <MainLayout>
        <Container>
          <CheckoutContainer>
            <Row>
              <Col lg="5">
                <WrapperCheckoutItem>
                  <Heading as="h3">Revisar pedido</Heading>

                  <ProductsCheckout />

                  <hr />

                  <DiscountCoupon onApplyDiscount={applyDiscount} />

                  {/* <hr /> */}
                  {/* <div>TODO: AQUI VAI A FORMA DE ENVIO (deduzir do total)</div> */}

                  <hr />

                  <Text as="strong" size={'md'}>
                    Total a pagar: {formatValue(total)}{' '}
                  </Text>
                </WrapperCheckoutItem>
              </Col>

              <Col lg="4">
                <WrapperCheckoutItem>
                  <Heading as="h3">Endereço de entrega</Heading>

                  <Address onAddress={onAddress} />
                </WrapperCheckoutItem>
              </Col>

              <Col lg="3">
                <WrapperCheckoutItem>
                  <Heading as="h3">Resumo do pedido</Heading>
                  <SummaryPayment discount={couponDiscount?.discount} />

                  <hr />

                  <Heading as="h3">Forma de pagamento</Heading>
                  <PaymentMethod method={method} onTypeMethod={onTypeMethod} />

                  <hr />

                  <TotalOrder as="strong" size={'lg'}>
                    Total do pedido: {formatValue(total)}
                  </TotalOrder>

                  {hasAddress && (
                    <Button onClick={handleFinishPayment}>
                      Finalizar pedido
                    </Button>
                  )}
                </WrapperCheckoutItem>
              </Col>
            </Row>
          </CheckoutContainer>
        </Container>
      </MainLayout>
    </>
  )
}
