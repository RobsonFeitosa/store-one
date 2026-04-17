import { inject, injectable } from 'tsyringe'
import ITimeDiscountRepository from '../repositories/ITimeDiscountRepository'
import AppError from '@shared/errors/AppError'

@injectable()
class DeleteTimeDiscountService {
  constructor(
    @inject('TimeDiscountRepository')
    private TimeDiscountRepository: ITimeDiscountRepository,
  ) {}

  public async execute(timeDiscountId: string): Promise<void> {
    const timeDiscount =
      await this.TimeDiscountRepository.findById(timeDiscountId)

    if (!timeDiscount) {
      throw new AppError('Time discount not found')
    }

    await this.TimeDiscountRepository.delete(timeDiscountId)
  }
}

export default DeleteTimeDiscountService
