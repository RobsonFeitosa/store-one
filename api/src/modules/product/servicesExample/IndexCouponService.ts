import { inject, injectable } from 'tsyringe'

import Coupon from '../infra/typeorm/entities/Coupon'
import CouponRepository from '../infra/typeorm/repositories/CouponRepository'

@injectable()
class IndexCouponService {
  constructor(
    @inject('CouponRepository')
    private couponRepository: CouponRepository,
  ) {}

  public async execute(): Promise<Coupon[]> {
    const coupons = await this.couponRepository.All()

    return coupons
  }
}

export default IndexCouponService
