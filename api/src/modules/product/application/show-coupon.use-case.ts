import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Coupon } from "../domain/entities/coupon.entity";
import type { CouponRepository } from "../domain/repositories/coupon.repository";

@Injectable()
export class ShowCouponUseCase {
    constructor(
        @Inject('COUPON_REPOSITORY_TOKEN')
        private readonly couponRepository: CouponRepository,
    ) { }

    async execute(code: string): Promise<Coupon> {
        const coupon = await this.couponRepository.findByCode(code);

        if (!coupon) {
            throw new NotFoundException('Coupon not found');
        }

        return coupon;
    }
}
