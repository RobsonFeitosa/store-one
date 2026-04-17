import { Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';
import { Archive } from "../../../domain/entities/archive.entity";
import { ArchiveRepository, FilterOptions } from "../../../domain/repositories/archive.repository";

@Injectable()
export class TypeOrmArchiveRepository implements ArchiveRepository {
    constructor(
        private readonly ormRepo: Repository<Archive>
    ) { }


    async create(archive: Archive): Promise<Archive> {
        const saved = await this.ormRepo.save(archive);
        return saved;
    }

    async findById(id: string): Promise<Archive | null> {
        const entity = await this.ormRepo.findOneBy({ id });
        return entity;
    }

    async findByName(name: string): Promise<Archive | null> {
        const entity = await this.ormRepo.findOneBy({ name });
        return entity;
    }

    async findAllByReferenceId(id: string): Promise<Archive[]> {
        const entities = await this.ormRepo.findBy({ reference_id: id });
        return entities;
    }

    async findAndCount(options: FilterOptions): Promise<[Archive[], number]> {
        const { page = 1, limit = 10, originName, referenceId } = options;
        const skip = (page - 1) * limit;

        const [data, total] = await this.ormRepo.findAndCount({
            take: limit,
            skip,
            where: [
                { reference_id: referenceId },
                { origin_target: originName }
            ].filter(cond => Object.values(cond)[0] !== undefined)
        });

        return [data, total];
    }

    async delete(id: string): Promise<void> {
        await this.ormRepo.delete(id);
    }

    async save(archive: Archive): Promise<Archive> {
        const saved = await this.ormRepo.save(archive);
        return saved;
    }
}

