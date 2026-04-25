import { Calendar } from '@/components/Calendar'
import { useEffect, useMemo, useState } from 'react'
import dayjs from 'dayjs'
import { Text } from '@lemonade-technologies-hub-ui/react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DialogCloseCustom } from '@/components/DialogCloseCustom'
import { useGetProfessionalsAvailables } from '../../hooks/useGetProfessionalsAvailables'
import { useGetAvailablesDatesProfessional } from '../../hooks/useGetAvailablesDatesProfessional'
import { Option } from '@/dtos'
import Skeleton from 'react-loading-skeleton'

import {
  CalendarWrapper,
  LoadingWrapper,
  ScheduleContainer,
  ScheduleContent,
  SwitchProfessionalWrapper,
  TimePicker,
  TimePickerHeader,
  TimePickerItem,
  TimePickerList,
} from './styles'

interface CalendarStepProps {
  onClose: () => void
  onSelectedDateTime: (time: Date | null) => void
  onCheckoutModal: (open: boolean) => void
  onProfessionalOption: (option: Option) => void
  onDateSelected?: (selected: boolean) => void
}

export default function Schedule({
  onClose,
  onSelectedDateTime,
  onCheckoutModal,
  onProfessionalOption,
  onDateSelected,
}: CalendarStepProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [professionalId, setProfessionalId] = useState<string | null>(null)

  const isDateSelected = !!selectedDate

  useEffect(() => {
    onDateSelected?.(isDateSelected)
  }, [isDateSelected, onDateSelected])

  const weekDay = selectedDate ? dayjs(selectedDate).format('dddd') : null
  const describedDate = selectedDate
    ? dayjs(selectedDate).format('DD[ de ]MMMM')
    : null

  const selectedDateWithoutTime = selectedDate
    ? dayjs(selectedDate).format('YYYY-MM-DD')
    : null

  const { data: availability, refetch: getAvaiablesDatesProfessional } =
    useGetAvailablesDatesProfessional(professionalId, {
      date: selectedDateWithoutTime,
    })

  console.log(availability)

  useEffect(() => {
    professionalId && selectedDate && getAvaiablesDatesProfessional()
  }, [professionalId, getAvaiablesDatesProfessional, selectedDate])

  function handleSelectTime(hour: number) {
    const dateWithTime = dayjs(selectedDate)
      .set('hour', hour)
      .startOf('hour')
      .toDate()

    onSelectedDateTime(dateWithTime)
    onCheckoutModal(true)
    onClose()
  }

  function handleChangeProfessional(e: any) {
    setProfessionalId(e.value)
    onProfessionalOption(e)
  }

  const { data: professionalAvailables } =
    useGetProfessionalsAvailables()

  const optionsAvailablesProfessional = useMemo(() => {
    return professionalAvailables?.map((professional) => ({
      label: professional.name,
      value: professional.id,
    }))
  }, [professionalAvailables])

  // useEffect(() => {
  //   selectedDate && getAvaiablesDatesProfessional()
  // }, [professionalId])

  // function handleClearSelectedDateTime() {
  //   onSelectedDateTime(null)
  // }

  const [loadingDates, setLoadingDates] = useState(true)

  useEffect(() => {
    if (professionalId) {
      setTimeout(() => {
        setLoadingDates(false)
      }, 400)
    }
  }, [professionalId])
  return (
    <div>

      <SwitchProfessionalWrapper>
        <Text>
          Selecione um profissional para verificar sua disponibilidade, escolha
          um horário e faça seu pedido.
        </Text>
        <Select onValueChange={(value) => {
          const professional = professionalAvailables?.find(p => p.id === value)
          if (professional) {
            handleChangeProfessional({ value: professional.id, label: professional.name })
          }
        }}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione um profissional" />
          </SelectTrigger>
          <SelectContent>
            {optionsAvailablesProfessional?.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </SwitchProfessionalWrapper>

      {professionalId && (
        <>
          {loadingDates ? (
            <LoadingWrapper>
              <Skeleton count={1} height={403} borderRadius={8} />
            </LoadingWrapper>
          ) : (
            <ScheduleContent isTimePickerOpen={isDateSelected}>
              {/* <CalendarWrapper isDateSelected={isDateSelected} style={{ width: isDateSelected ? 480 : '100%' }}> */}
              <CalendarWrapper isDateSelected={isDateSelected}>
                <Calendar
                  professionalId={professionalId}
                  onDateSelected={setSelectedDate}
                // selectedDate={new Date('2023-11-27T17:09:38.897Z')}
                />
              </CalendarWrapper>

              {isDateSelected && (
                <TimePicker
                  isScroll={
                    availability?.possibleTimes &&
                    availability.possibleTimes.length > 8
                  }
                >
                  <TimePickerHeader>
                    {weekDay} - <span>{describedDate}</span>
                  </TimePickerHeader>

                  <TimePickerList>
                    {availability?.possibleTimes.map((hour) => {
                      return (
                        <TimePickerItem
                          key={hour}
                          onClick={() => handleSelectTime(hour)}
                          disabled={!availability.availableTimes.includes(hour)}
                        >
                          {String(hour).padStart(2, '0')}:00h
                        </TimePickerItem>
                      )
                    })}
                  </TimePickerList>
                </TimePicker>
              )}
            </ScheduleContent>
          )}
        </>
      )}
    </div>
  )
}
