import ICreateCouponDTO from '../dtos/ICreateCouponDTO'
import Coupon from '../infra/typeorm/entities/Coupon'

export default interface ICouponRepository {
  create(data: ICreateCouponDTO): Promise<Coupon>
  findById(id: string): Promise<Coupon | null>
  findByCode(code: string): Promise<Coupon | null>
  delete(id: string): Promise<void>
  update(data: ICreateCouponDTO): Promise<Coupon>
  save(data: Coupon): Promise<Coupon>
  All(): Promise<Coupon[]>
}
