import { IoCaretDownSharp, IoCaretUpSharp } from 'react-icons/io5'
import AdminLayout from '@/components/components/Layout/Admin'

import { Heading, Text } from '@lemonade-technologies-hub-ui/react'

import SyncingCharts from '@/components/charts/SyncingCharts'
import CircleCharts from '@/components/charts/CircleCharts'

import {
  ArrowsLeftRight,
  Calendar,
  Coins,
  Package,
  Users,
} from 'phosphor-react'

import {
  CircleIcon,
  DashaboardContainer,
  GraficInfor,
  GraficSales,
  GraficTopSales,
  GraficWrapperTop,
  InforBox,
  InforContent,
  ListContent,
  ListContentScheduling,
  ListHeaders,
  ListHeadersScheduling,
  ListOrders,
  ListScheduling,
  SallesLastOrder,
  SallesWrapper,
  SchedulingLast,
  ShortInfor,
  TextColor,
} from './styles'

export default function Dashboard() {
  return (
    <AdminLayout>
      <DashaboardContainer>
        <ShortInfor>
          <InforBox>
            <div>
              <CircleIcon>
                <Coins size={35} />
              </CircleIcon>

              <InforContent>
                <div>
                  <Text size={'lg'}>R$ 513,00</Text>
                  <TextColor isNegative={false}>
                    <IoCaretUpSharp />

                    <Text as="span">12%</Text>
                  </TextColor>
                </div>
                <Text>Rendimento total</Text>
              </InforContent>
            </div>
          </InforBox>
          <InforBox>
            <div>
              <CircleIcon color="yellow">
                <ArrowsLeftRight size={35} />
              </CircleIcon>

              <InforContent>
                <div>
                  <Text size={'lg'}>321</Text>
                  <TextColor isNegative={false}>
                    <IoCaretUpSharp />
                    <Text as="span">09%</Text>
                  </TextColor>
                </div>
                <Text>Transações totais</Text>
              </InforContent>
            </div>
          </InforBox>
          <InforBox>
            <div>
              <CircleIcon color="red">
                <Package size={35} />
              </CircleIcon>

              <InforContent>
                <div>
                  <Text size={'lg'}>545</Text>
                  <TextColor isNegative={false}>
                    <IoCaretUpSharp />
                    <Text as="span">13%</Text>
                  </TextColor>
                </div>
                <Text>Produtos totais</Text>
              </InforContent>
            </div>
          </InforBox>
          <InforBox>
            <div>
              <CircleIcon color="violet">
                <Calendar size={35} />
              </CircleIcon>

              <InforContent>
                <div>
                  <Text size={'lg'}>331</Text>
                  <TextColor isNegative={false}>
                    <IoCaretUpSharp />
                    <Text as="span">06%</Text>
                  </TextColor>
                </div>
                <Text>Agendas totais</Text>
              </InforContent>
            </div>
          </InforBox>
          <InforBox>
            <div>
              <CircleIcon color="azul">
                <Users size={35} />
              </CircleIcon>

              <InforContent>
                <div>
                  <Text size={'lg'}>254</Text>
                  <TextColor isNegative={true}>
                    <IoCaretDownSharp />
                    <Text as="span">04%</Text>
                  </TextColor>
                </div>
                <Text>Usuários totais</Text>
              </InforContent>
            </div>
          </InforBox>
        </ShortInfor>

        <GraficInfor>
          <GraficSales>
            <Heading as="h4">Crescimento da receita</Heading>
            <SyncingCharts />
          </GraficSales>

          <GraficTopSales>
            <Heading as="h4">Principais vendas de produtos e serviços</Heading>
            <GraficWrapperTop>
              <CircleCharts />
            </GraficWrapperTop>
          </GraficTopSales>
        </GraficInfor>

        <SallesWrapper>
          <SallesLastOrder>
            <Heading as="h4">Últimos pedidos</Heading>
            <ListOrders>
              <ListHeaders>
                <Text as="strong">Código</Text>
                <Text as="strong">Usuário</Text>
                <Text as="strong">Status</Text>
                <Text as="strong">Data</Text>
                <Text as="strong">Rastreio</Text>
              </ListHeaders>
              <ListContent>
                <div>
                  <Text>1DKQJ7P</Text>
                  <Text>Renato Souza</Text>
                  <TextColor isNegative>Pendente</TextColor>
                  <Text>15/04/2024 14:00h</Text>
                  <Text>BR154658484</Text>
                </div>
                <div>
                  <Text>2DKQQKP</Text>
                  <Text>Mauricio</Text>
                  <TextColor>Entregue</TextColor>
                  <Text>11/05/2024 13:00h</Text>
                  <Text>BR154658484</Text>
                </div>
                <div>
                  <Text>78GASDF</Text>
                  <Text>Agnaldo</Text>
                  <TextColor>Entregue</TextColor>
                  <Text>11/05/2024 13:00h</Text>
                  <Text>BR154658484</Text>
                </div>
                <div>
                  <Text>YA848FF</Text>
                  <Text>Agnaldo</Text>
                  <TextColor isNegative>Pendente</TextColor>
                  <Text>15/04/2024 14:00h</Text>
                  <Text>BR154658484</Text>
                </div>

                <div>
                  <Text>2DKQQKP</Text>
                  <Text>Mauricio</Text>
                  <TextColor>Entregue</TextColor>
                  <Text>11/05/2024 13:00h</Text>
                  <Text>BR154658484</Text>
                </div>
              </ListContent>
            </ListOrders>
          </SallesLastOrder>
          <SchedulingLast>
            <Heading as="h4">Últimas agendas</Heading>

            <ListScheduling>
              <ListHeadersScheduling>
                <Text as="strong">Usuário</Text>
                <Text as="strong">Serviço</Text>
                <Text as="strong">Data agendada</Text>
                <Text as="strong">Profissional</Text>
              </ListHeadersScheduling>
              <ListContentScheduling>
                <div>
                  <Text>João Ribeiro</Text>
                  <Text>Troca de óleo com filtro</Text>
                  <Text>15/04/2024 14:00h</Text>
                  <Text>Julio</Text>
                </div>
                <div>
                  <Text>Ricardo ...</Text>
                  <Text>Formatação de computador...</Text>
                  <Text>11/05/2024 13:00h</Text>
                  <Text>Marcos</Text>
                </div>
                <div>
                  <Text>Lucas Toledo</Text>
                  <Text>Instalação de sistema...</Text>
                  <Text>09/04/2024 10:00h</Text>
                  <Text>Luciano</Text>
                </div>
                <div>
                  <Text>Marcos Vinicius</Text>
                  <Text>Maquiagem profissional</Text>
                  <Text>14/04/2024 14:00h</Text>
                  <Text>Jaqueline</Text>
                </div>
                <div>
                  <Text>Bruno Pereira</Text>
                  <Text>Clareamento dental</Text>
                  <Text>17/03/2024 14:00h</Text>
                  <Text>Jaqueline</Text>
                </div>
              </ListContentScheduling>
            </ListScheduling>
          </SchedulingLast>
        </SallesWrapper>
      </DashaboardContainer>
    </AdminLayout>
  )
}
