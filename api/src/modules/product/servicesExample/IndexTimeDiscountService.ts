import { inject, injectable } from 'tsyringe'
import TimeDiscount from '../infra/typeorm/entities/TimeDiscount'
import IPaginationOptionsDTO from '@modules/dtos/IPaginationOptionsDTO'
import ITimeDiscountRepository from '../repositories/ITimeDiscountRepository'

@injectable()
class IndexTimeDiscountService {
  constructor(
    @inject('TimeDiscountRepository')
    private TimeDiscountRepository: ITimeDiscountRepository,
  ) {}

  public async execute(
    options: IPaginationOptionsDTO,
  ): Promise<[TimeDiscount[], number]> {
    const timeDiscountsData =
      await this.TimeDiscountRepository.findAndCount(options)

    return timeDiscountsData
  }
}

export default IndexTimeDiscountService
