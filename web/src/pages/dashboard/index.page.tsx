import DashboardLayout from '@/components/components/Layout/Dashboard'
import { Welcome } from './components/Welcome'
import { Heading, Text } from '@lemonade-technologies-hub-ui/react'
import { CouponWin } from './components/CouponWin'
import { Col, Row } from 'react-bootstrap'
import { AddressBook, ClipboardText } from 'phosphor-react'
import { useGetLastOrder } from '@/hooks/useGetLastOrder'
import { useEffect, useMemo, useState } from 'react'
import { useAuth } from '@/hooks/providers/auth'

import {
  AddingAddress,
  CompleteRegister,
  CompleteRegisterWrapper,
  DashboardContent,
  IconWp,
  LastOrder,
  LoadingWrapper,
  OrderWrapper,
} from './styles'
import Skeleton from 'react-loading-skeleton'
import { builderStatusNamed } from '../utils/builderLastStatus'

export default function Dashboard() {
  const { user } = useAuth()
  const [isLoading, setLoading] = useState(true)

  const {
    isLoading: isLoadingLastOrder,
    data: lastOrderData,
    refetch: getLastOrder,
  } = useGetLastOrder()

  useEffect(() => {
    user && getLastOrder()
  }, [user, getLastOrder])

  const lastStatusOrder = useMemo(() => {
    return (
      (lastOrderData?.status &&
        lastOrderData.status[lastOrderData.status.length - 1].name) ??
      ''
    )
  }, [lastOrderData])

  useEffect(() => {
    setLoading(isLoadingLastOrder)
  }, [isLoadingLastOrder])

  return (
    <DashboardLayout>
      <DashboardContent>
        {isLoading ? (
          <LoadingWrapper>
            <Skeleton count={1} height={40} borderRadius={8} width={400} />
            <Skeleton count={1} height={40} borderRadius={8} width={800} />
            <Skeleton
              count={1}
              height={90}
              borderRadius={8}
              width={'100%'}
              style={{ marginTop: 20 }}
            />

            <div className="flex-wrapper">
              <div>
                <Skeleton
                  count={1}
                  height={90}
                  borderRadius={8}
                  width={'100%'}
                  style={{ marginTop: 15 }}
                />
              </div>

              <div>
                <Skeleton
                  count={1}
                  height={90}
                  borderRadius={8}
                  width={'100%'}
                  style={{ marginTop: 15 }}
                />
              </div>
            </div>
          </LoadingWrapper>
        ) : (
          <>
            <Welcome />

            <CouponWin />

            <Row>
              {lastOrderData && (
                <Col xs="12" sm="12" md="4" lg="4">
                  <LastOrder>
                    <Heading as="h4">Último pedido</Heading>
                    <OrderWrapper>
                      <Text>Pedido: {lastOrderData.cod_order}</Text>
                      <Text>
                        Situação: {builderStatusNamed(lastStatusOrder)}
                      </Text>
                    </OrderWrapper>
                  </LastOrder>
                </Col>
              )}

              <Col xs="12" sm="12" md={lastOrderData ? 8 : 12} lg={lastOrderData ? 8 : 12}>
                <CompleteRegister>
                  <CompleteRegisterWrapper>
                    <Heading as="h4">Complete seu cadastro</Heading>
                    <Text>
                      Insira as informações adicionais no seu cadastro para
                      ficar completamente atualizado e receber notificações
                      importantes sobre nossos produtos, promoções e eventos
                      exclusivos.
                    </Text>
                  </CompleteRegisterWrapper>

                  <IconWp>
                    <ClipboardText size={44} />
                  </IconWp>
                </CompleteRegister>
              </Col>

              <Col xs="12" sm="12" md="12" lg="12">
                <AddingAddress>
                  <div>
                    <Heading as="h4">Cadastre um endereço</Heading>
                    <Text>
                      Cadastre seu endereço para garantir entregas rápidas e
                      precisas. É essencial para uma experiência de compra
                      tranquila. Seus dados são seguros conosco e usados apenas
                      para entregas e comunicação sobre seus pedidos. Não perca
                      tempo, cadastre seu endereço agora e aproveite!
                    </Text>
                  </div>
                  <div>
                    <AddressBook size={44} />
                  </div>
                </AddingAddress>
              </Col>
            </Row>
          </>
        )}
      </DashboardContent>
    </DashboardLayout>
  )
}
