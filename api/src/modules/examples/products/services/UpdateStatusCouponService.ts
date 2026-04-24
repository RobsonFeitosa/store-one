import { inject, injectable } from 'tsyringe'

import Coupon from '../infra/typeorm/entities/Coupon'
import CouponRepository from '../infra/typeorm/repositories/CouponRepository'
import { CouponStatus } from '../dtos/ICreateCouponDTO'
import AppError from '@shared/errors/AppError'

interface UpdateStatusCoupon {
  status: CouponStatus
  code: string
}

@injectable()
class UpdateStatusCouponService {
  constructor(
    @inject('CouponRepository')
    private couponRepository: CouponRepository,
  ) {}

  public async execute({ status, code }: UpdateStatusCoupon): Promise<Coupon> {
    const coupon = await this.couponRepository.findByCode(code)

    if (!coupon) {
      throw new AppError('Coupon not found')
    }

    if (this.hasPassedDateValid(coupon.validation)) {
      throw new AppError('Coupon expired')
    }

    if (coupon.status === 'used') {
      throw new AppError('Coupon has already been used')
    }

    if (coupon.status === 'invalid') {
      throw new AppError('Invalid coupon')
    }

    coupon.status = status

    await this.couponRepository.save(coupon)

    return coupon
  }

  private hasPassedDateValid(dataValid: Date): boolean {
    const now = new Date().getTime()
    const valid = dataValid.getTime()

    return valid < now
  }
}

export default UpdateStatusCouponService
