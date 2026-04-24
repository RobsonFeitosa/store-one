import TimeDiscount from '../infra/typeorm/entities/TimeDiscount'

export type StatusTimeDiscount = 'idle' | 'actived' | 'complete' | 'cancel'

export interface ICreateTimeDiscountDTO
  extends Omit<
    TimeDiscount,
    'id' | 'status' | 'products' | 'created_at' | 'updated_at'
  > {
  status: StatusTimeDiscount
}
