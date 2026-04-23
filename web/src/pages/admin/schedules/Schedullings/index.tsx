import { Text } from '@lemonade-technologies-hub-ui/react'
import dayjs from 'dayjs'
import { CalendarCheck } from 'phosphor-react'
import { IScheduleDTO } from '@/pages/admin/dtos/schedule.dto'

import {
  BoxWhite,
  BtnEdit,
  SchedullingContainer,
  SchedullingContent,
  SchedullingFooter,
  SchedullingHeader,
  SchedullingSingle,
  WrapperDate,
} from './styles'

interface SchedullingProps {
  schedulling: IScheduleDTO
  onEditSchedullingId: (schedullingId: string) => void
}

export default function Schedulling({
  schedulling,
  onEditSchedullingId,
}: SchedullingProps) {
  const day = dayjs(schedulling.date).format('dddd[,] DD [de] MMMM')
  const hourStart = dayjs(schedulling.date).format('H:mm')
  const hourEnd = dayjs(schedulling.date).add(1, 'hour').format('H:mm')

  return (
    <SchedullingContainer>
      <SchedullingSingle>
        <div>
          <SchedullingHeader>
            <Text>
              <Text as="strong">{schedulling.name}</Text>
            </Text>
          </SchedullingHeader>
          <hr />

          <SchedullingContent>
            <div>
              <div>
                <Text> Cliente: nome do cliente </Text>
                <Text> Profissional: {schedulling.professional?.name} </Text>
                <Text> Servićo: nome do servićo </Text>
                <Text> Local: local do servico </Text>
              </div>
              {/* <div>
                <Text>Local: Estabelecimento comercial</Text>
              </div> */}
            </div>
            <BoxWhite>
              <WrapperDate>
                <CalendarCheck size={22} />
                <div>
                  <Text as="span">{day}</Text>
                  <Text as="span">&bull;</Text>
                  <Text as="span">{hourStart}</Text>
                  <Text as="span">até</Text>
                  <Text as="span">{hourEnd}</Text>
                </div>
              </WrapperDate>
              {/* {formatDate({
                  date: schedulling.date,
                  hoursView: true,
                })} */}
            </BoxWhite>
          </SchedullingContent>
        </div>
        <SchedullingFooter>
          <BtnEdit onClick={() => onEditSchedullingId('')}>cancelar</BtnEdit>
          <BtnEdit onClick={() => onEditSchedullingId('')}>mudar data</BtnEdit>
        </SchedullingFooter>
      </SchedullingSingle>
    </SchedullingContainer>
  )
}
