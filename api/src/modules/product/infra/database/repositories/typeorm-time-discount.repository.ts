import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TimeDiscount } from "../../../domain/entities/time-discount.entity";
import { TimeDiscountRepository } from "../../../domain/repositories/time-discount.repository";

@Injectable()
export class TypeOrmTimeDiscountRepository implements TimeDiscountRepository {
    constructor(
        @InjectRepository(TimeDiscount)
        private readonly ormRepo: Repository<TimeDiscount>
    ) { }

    async create(data: Partial<TimeDiscount>): Promise<TimeDiscount> {
        const timeDiscount = this.ormRepo.create(data);
        return this.ormRepo.save(timeDiscount);
    }

    async findById(id: string): Promise<TimeDiscount | null> {
        return this.ormRepo.findOne({
            where: { id },
            relations: ['products']
        });
    }

    async findAll(): Promise<TimeDiscount[]> {
        return this.ormRepo.find({
            relations: ['products']
        });
    }

    async save(timeDiscount: TimeDiscount): Promise<TimeDiscount> {
        return this.ormRepo.save(timeDiscount);
    }

    async delete(id: string): Promise<void> {
        await this.ormRepo.delete(id);
    }
}
