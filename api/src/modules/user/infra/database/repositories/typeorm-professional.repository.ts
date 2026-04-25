import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Professional } from "src/modules/users/infra/typeorm/entities/Professional";
import type { ProfessionalRepository } from "src/modules/user/domain/repositories/professional.repository";

@Injectable()
export class TypeOrmProfessionalRepository implements ProfessionalRepository {
    constructor(
        private readonly ormRepo: Repository<Professional>
    ) { }

    async findById(id: string): Promise<Professional | null> {
        return this.ormRepo.findOne({
            where: { id },
        });
    }

    async findAvailable(): Promise<Professional[]> {
        return this.ormRepo.createQueryBuilder('pr100_professional')
            .where('pr100_professional.actived = true')
            .select()
            .orderBy('RANDOM()')
            .getMany();
    }

    async findAndCount(options: { page: number; limit: number }): Promise<[Professional[], number]> {
        const { page, limit } = options;
        const skip = (page - 1) * limit;

        return this.ormRepo.findAndCount({
            take: limit,
            skip,
            order: { created_at: 'DESC' },
            relations: ['user', 'team'],
        });
    }
}
