import { Inject, Injectable } from "@nestjs/common";
import { Coupon } from "../domain/entities/coupon.entity";
import type { CouponRepository } from "../domain/repositories/coupon.repository";
import { CreateCouponDto } from "../infra/http/dtos/create-coupon.dto";
import type IHashProvider from "../../user/infra/providers/HashProvider/models/IHashProvider";

@Injectable()
export class CreateCouponUseCase {
    constructor(
        @Inject('COUPON_REPOSITORY_TOKEN')
        private readonly couponRepository: CouponRepository,

        @Inject('HASH_PROVIDER_TOKEN')
        private readonly hashProvider: IHashProvider,
    ) { }

    async execute(data: CreateCouponDto): Promise<Coupon> {
        const { status = 'available', code_coupon, ...rest } = data;

        let finalCode = code_coupon;

        if (!finalCode) {
            const randonHash = String(Math.random());
            const hash = await this.hashProvider.generateHash(randonHash);
            finalCode = hash.toLocaleUpperCase().slice(-8, -1);
        }

        const coupon = new Coupon({
            ...rest,
            code_coupon: finalCode,
            status,
            validation: new Date(data.validation)
        });

        return this.couponRepository.create(coupon);
    }
}
