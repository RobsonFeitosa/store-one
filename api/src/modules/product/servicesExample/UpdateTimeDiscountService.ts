import { inject, injectable } from 'tsyringe'
import TimeDiscount from '../infra/typeorm/entities/TimeDiscount'
import ITimeDiscountRepository from '../repositories/ITimeDiscountRepository'
import AppError from '@shared/errors/AppError'

@injectable()
class UpdateTimeDiscountService {
  constructor(
    @inject('TimeDiscountRepository')
    private TimeDiscountRepository: ITimeDiscountRepository,
  ) {}

  public async execute(
    timeDiscountId: string,
    payload: TimeDiscount,
  ): Promise<TimeDiscount> {
    const timeDiscount =
      await this.TimeDiscountRepository.findById(timeDiscountId)

    if (!timeDiscount) {
      throw new AppError('Time discount not found')
    }

    timeDiscount.status = payload.status
    timeDiscount.discount = payload.discount
    timeDiscount.startDate = payload.startDate
    timeDiscount.endDate = payload.endDate
    timeDiscount.productsIds = JSON.stringify(payload.productsIds)

    await this.TimeDiscountRepository.save(timeDiscount)
    return timeDiscount
  }
}

export default UpdateTimeDiscountService
