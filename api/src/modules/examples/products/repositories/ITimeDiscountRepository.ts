import IPaginationOptionsDTO from '../../dtos/IPaginationOptionsDTO'
import { ICreateTimeDiscountDTO } from '../dtos/ICreateTimeDiscountDTO'
import TimeDiscount from '../infra/typeorm/entities/TimeDiscount'

export default interface ITimeDiscountRepository {
  create(data: ICreateTimeDiscountDTO): Promise<TimeDiscount>
  findById(id: string): Promise<TimeDiscount | null>
  findAndCount(
    options: IPaginationOptionsDTO,
  ): Promise<[TimeDiscount[], number]>
  findByAllAvailable(): Promise<TimeDiscount[]>
  delete(id: string): Promise<void>
  save(data: TimeDiscount): Promise<TimeDiscount>
  All(): Promise<TimeDiscount[]>
}
