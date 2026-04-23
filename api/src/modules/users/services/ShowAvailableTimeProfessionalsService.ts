import { injectable, inject } from 'tsyringe'

import ITimeIntervalsRepository from '../repositories/ITimeIntervalsRepository'
import IProfessionalRepository from '../repositories/IProfessionalRepository'
import dayjs from 'dayjs'
import IScheduleRepository from '@modules/schedule/repositories/IScheduleRepository'

interface IResponse {
  possibleTimes: number[]
  availableTimes: number[]
}

@injectable()
class ShowAvailableTimeProfessionalsService {
  constructor(
    @inject('TimeIntervalsRepository')
    private timeIntervalsRepository: ITimeIntervalsRepository,

    @inject('ScheduleRepository')
    private scheduleRepository: IScheduleRepository,
  ) {}

  public async execute(
    professionalId: string,
    date: string,
  ): Promise<IResponse> {
    const referenceDate = dayjs(String(date))

    const professionalAvailable =
      await this.timeIntervalsRepository.findByProfessionalAndWeekDay(
        professionalId,
        referenceDate.get('day'),
      )

    if (!professionalAvailable) {
      return { possibleTimes: [], availableTimes: [] }
    }

    const {
      time_start_in_minutes_one,
      time_end_in_minutes_one,
      time_start_in_minutes_two,
      time_end_in_minutes_two,
    } = professionalAvailable

    const startHour = time_start_in_minutes_one / 60
    const endHour = time_end_in_minutes_one / 60

    const startHourTwo = (time_start_in_minutes_two ?? 0) / 60
    const endHourTwo = (time_end_in_minutes_two ?? 0) / 60

    const possibleTimesOne = Array.from({ length: endHour - startHour }).map(
      (_, i) => {
        return startHour + i
      },
    )

    const possibleTimesTwo = Array.from({
      length: endHourTwo - startHourTwo,
    }).map((_, i) => {
      return startHourTwo + i
    })

    const blockedTimes =
      await this.scheduleRepository.findByProfessionalIdAndDates(
        professionalId,
        referenceDate.set('hour', startHour).toDate(),
        referenceDate.set('hour', endHour).toDate(),
      )

    const blockedTimesTwo =
      await this.scheduleRepository.findByProfessionalIdAndDates(
        professionalId,
        referenceDate.set('hour', startHourTwo).toDate(),
        referenceDate.set('hour', endHourTwo).toDate(),
      )

    const availableTimesOne = possibleTimesOne.filter((time) => {
      const isTimeBlocked = blockedTimes.some(
        (blockedTime) => blockedTime.date.getHours() === time,
      )

      const isTimeInPast = referenceDate.set('hour', time).isBefore(new Date())

      return !isTimeBlocked && !isTimeInPast
    })

    const availableTimesTwo = possibleTimesTwo.filter((time) => {
      const isTimeBlocked = blockedTimesTwo.some(
        (blockedTime) => blockedTime.date.getHours() === time,
      )

      const isTimeInPast = referenceDate.set('hour', time).isBefore(new Date())

      return !isTimeBlocked && !isTimeInPast
    })

    const availableTimes = availableTimesOne.concat(availableTimesTwo)
    const possibleTimes = possibleTimesOne.concat(possibleTimesTwo)

    return { possibleTimes, availableTimes }
  }
}

export default ShowAvailableTimeProfessionalsService
