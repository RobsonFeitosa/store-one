import Coupon from '../infra/typeorm/entities/Coupon'

export type CouponStatus = 'used' | 'invalid' | 'available'

export default interface ICreateCouponDTO
  extends Omit<Coupon, 'created_at' | 'updated_at' | 'id'> {
  status: CouponStatus
}
