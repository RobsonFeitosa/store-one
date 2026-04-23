import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateCouponUseCase } from '../../../application/create-coupon.use-case';
import { IndexCouponsUseCase } from '../../../application/index-coupons.use-case';
import { ShowCouponUseCase } from '../../../application/show-coupon.use-case';
import { UpdateStatusCouponUseCase } from '../../../application/update-status-coupon.use-case';
import { CreateCouponDto } from '../dtos/create-coupon.dto';

@Controller('coupons')
export class CouponController {
    constructor(
        private readonly createCouponUseCase: CreateCouponUseCase,
        private readonly indexCouponsUseCase: IndexCouponsUseCase,
        private readonly showCouponUseCase: ShowCouponUseCase,
        private readonly updateStatusCouponUseCase: UpdateStatusCouponUseCase,
    ) { }

    @Post()
    async create(@Body() data: CreateCouponDto) {
        return this.createCouponUseCase.execute(data);
    }

    @Get()
    async index() {
        return this.indexCouponsUseCase.execute();
    }

    @Get(':code')
    async show(@Param('code') code: string) {
        return this.showCouponUseCase.execute(code);
    }

    @Put('status')
    async updateStatus(@Body() data: { code: string; status: string }) {
        return this.updateStatusCouponUseCase.execute(data);
    }
}
