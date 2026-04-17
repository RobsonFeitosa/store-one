import { inject, injectable } from 'tsyringe'

import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider'
import Coupon from '../infra/typeorm/entities/Coupon'
import CouponRepository from '../infra/typeorm/repositories/CouponRepository'
import ICreateCouponDTO from '../dtos/ICreateCouponDTO'

@injectable()
class CreateCouponService {
  constructor(
    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('CouponRepository')
    private couponRepository: CouponRepository,
  ) {}

  public async execute(payload: ICreateCouponDTO): Promise<Coupon> {
    const { status = 'available', ...rest } = payload
    const randonHash = String(Math.random())

    const hash = await this.hashProvider.generateHash(randonHash)

    const couponBuild = hash.toLocaleUpperCase().slice(-8, -1)

    const coupon = await this.couponRepository.create({
      ...rest,
      code_coupon: couponBuild,
      status,
    })

    return coupon
  }
}

export default CreateCouponService
