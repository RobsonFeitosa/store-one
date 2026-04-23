import { injectable, inject } from 'tsyringe'

import TimeIntervals from '../infra/typeorm/entities/TimeIntervals'
import ITimeIntervalsRepository from '../repositories/ITimeIntervalsRepository'
import AppError from '@shared/errors/AppError'
import IProfessionalRepository from '../repositories/IProfessionalRepository'

interface IResponse {
  blockedWeekDays: number[]
  blockedDates: number[]
}

@injectable()
class ShowBlockedDatesService {
  constructor(
    @inject('TimeIntervalsRepository')
    private timeIntervalsRepository: ITimeIntervalsRepository,

    @inject('ProfessionalRepository')
    private professionalRepository: IProfessionalRepository,
  ) {}

  public async execute(
    professionalId: string,
    year: string,
    month: string,
  ): Promise<IResponse> {
    const professional =
      await this.professionalRepository.findById(professionalId)

    if (!professional) throw new AppError('Professional not found')

    const availableWeekDays =
      await this.timeIntervalsRepository.findByProfessionalId(professionalId)

    const blockedWeekDays = [0, 1, 2, 3, 4, 5, 6].filter((weekDay) => {
      return !availableWeekDays.some(
        (availableWeekDay) => availableWeekDay.week_day === weekDay,
      )
    })

    const blockedDatesRaw: Array<{ date: string }> =
      await this.timeIntervalsRepository.findBlockedDatesRow(
        professionalId,
        year,
        month,
      )

    const blockedDates = blockedDatesRaw.map((item) => Number(item.date))

    return { blockedWeekDays, blockedDates }
  }
}

export default ShowBlockedDatesService
