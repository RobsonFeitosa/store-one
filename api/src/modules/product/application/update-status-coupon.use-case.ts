import { Inject, Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { Coupon } from "../domain/entities/coupon.entity";
import type { CouponRepository } from "../domain/repositories/coupon.repository";

interface IRequest {
    code: string;
    status: string;
}

@Injectable()
export class UpdateStatusCouponUseCase {
    constructor(
        @Inject('COUPON_REPOSITORY_TOKEN')
        private readonly couponRepository: CouponRepository,
    ) { }

    async execute({ code, status }: IRequest): Promise<Coupon> {
        const coupon = await this.couponRepository.findByCode(code);

        if (!coupon) {
            throw new NotFoundException('Coupon not found');
        }

        if (this.hasPassedDateValid(coupon.validation)) {
            throw new BadRequestException('Coupon expired');
        }

        if (coupon.status === 'used') {
            throw new BadRequestException('Coupon has already been used');
        }

        if (coupon.status === 'invalid') {
            throw new BadRequestException('Invalid coupon');
        }

        coupon.status = status;

        return this.couponRepository.save(coupon);
    }

    private hasPassedDateValid(dataValid: Date): boolean {
        const now = new Date().getTime();
        const valid = new Date(dataValid).getTime();

        return valid < now;
    }
}
