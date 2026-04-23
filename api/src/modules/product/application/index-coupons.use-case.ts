import { Inject, Injectable } from "@nestjs/common";
import { Coupon } from "../domain/entities/coupon.entity";
import type { CouponRepository } from "../domain/repositories/coupon.repository";

@Injectable()
export class IndexCouponsUseCase {
    constructor(
        @Inject('COUPON_REPOSITORY_TOKEN')
        private readonly couponRepository: CouponRepository,
    ) { }

    async execute(): Promise<Coupon[]> {
        return this.couponRepository.findAll();
    }
}
