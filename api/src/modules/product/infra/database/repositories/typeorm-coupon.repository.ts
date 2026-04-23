import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Coupon } from "../../../domain/entities/coupon.entity";
import { CouponRepository } from "../../../domain/repositories/coupon.repository";

@Injectable()
export class TypeOrmCouponRepository implements CouponRepository {
    constructor(
        @InjectRepository(Coupon)
        private readonly ormRepo: Repository<Coupon>
    ) { }

    async create(coupon: Coupon): Promise<Coupon> {
        return this.ormRepo.save(coupon);
    }

    async findById(id: string): Promise<Coupon | null> {
        return this.ormRepo.findOneBy({ id } as any);
    }

    async findByCode(code: string): Promise<Coupon | null> {
        return this.ormRepo.findOneBy({ code_coupon: code });
    }

    async findAll(): Promise<Coupon[]> {
        return this.ormRepo.find();
    }

    async save(coupon: Coupon): Promise<Coupon> {
        return this.ormRepo.save(coupon);
    }

    async delete(id: string): Promise<void> {
        await this.ormRepo.delete(id);
    }
}
