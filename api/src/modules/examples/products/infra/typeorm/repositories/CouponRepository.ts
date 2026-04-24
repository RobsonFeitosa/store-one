import { Repository } from 'typeorm'

import dataSource from '@shared/infra/typeorm'
import ICreateCouponDTO from '@modules/products/dtos/ICreateCouponDTO'
import Coupon from '../entities/Coupon'
import ICouponRepository from '@modules/products/repositories/ICouponRepository'

class CouponRepository implements ICouponRepository {
  private ormRepository: Repository<Coupon>

  constructor() {
    this.ormRepository = dataSource.getRepository(Coupon)
  }

  public async create(data: ICreateCouponDTO): Promise<Coupon> {
    const couponCreated = this.ormRepository.create(data)

    await this.ormRepository.save(couponCreated)

    return couponCreated
  }

  public async findById(id: string): Promise<Coupon | null> {
    const findcoupon = await this.ormRepository.findOne({
      where: {
        id,
      },
    })

    return findcoupon
  }

  public async findByCode(code: string): Promise<Coupon | null> {
    const findcoupon = await this.ormRepository.findOne({
      where: {
        code_coupon: code,
      },
    })

    return findcoupon
  }

  public async delete(id: string): Promise<void> {
    const coupon = await this.ormRepository.findOne({
      where: {
        id,
      },
    })

    if (coupon) {
      this.ormRepository.remove(coupon)
    }
  }

  public async All(): Promise<Coupon[]> {
    const coupons = await this.ormRepository.find()

    return coupons
  }

  public async update(coupon: ICreateCouponDTO): Promise<Coupon> {
    const couponUpdate = await this.ormRepository.save(coupon)

    return couponUpdate
  }

  public async save(coupon: Coupon): Promise<Coupon> {
    return this.ormRepository.save(coupon)
  }
}

export default CouponRepository
