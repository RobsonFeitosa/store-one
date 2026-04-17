import { inject, injectable } from 'tsyringe'

import Coupon from '../infra/typeorm/entities/Coupon'
import CouponRepository from '../infra/typeorm/repositories/CouponRepository'
import AppError from '@shared/errors/AppError'

interface ShowCouponProps {
  code: string
}

@injectable()
class ShowCouponService {
  constructor(
    @inject('CouponRepository')
    private couponRepository: CouponRepository,
  ) {}

  public async execute({ code }: ShowCouponProps): Promise<Coupon> {
    const coupon = await this.couponRepository.findByCode(code)

    if (!coupon) {
      throw new AppError('Coupon not found')
    }

    return coupon
  }
}

export default ShowCouponService
