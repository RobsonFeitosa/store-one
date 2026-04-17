import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Archive as ArchiveDomain } from "src/modules/archive/domain/entities/archive.entity";
import { ArchiveRepository, FilterOptions } from "src/modules/archive/domain/repositories/archive.repository";
import { ArchiveEntity } from '../entities/archive.entity';
import { BaseMapper } from 'src/shared/infra/database/base.mapper';

@Injectable()
export class TypeOrmArchiveRepository implements ArchiveRepository {
    constructor(
        @InjectRepository(ArchiveEntity)
        private readonly ormRepo: Repository<ArchiveEntity>
    ) { }

    async create(archive: ArchiveDomain): Promise<ArchiveDomain> {
        const entity = BaseMapper.toPersistence(archive.toJSON(), ArchiveEntity);
        const saved = await this.ormRepo.save(entity);
        return BaseMapper.toDomain(saved, ArchiveDomain);
    }

    async findById(id: string): Promise<ArchiveDomain | null> {
        const entity = await this.ormRepo.findOneBy({ id });
        if (!entity) return null;
        return BaseMapper.toDomain(entity, ArchiveDomain);
    }

    async findByName(name: string): Promise<ArchiveDomain | null> {
        const entity = await this.ormRepo.findOneBy({ name });
        if (!entity) return null;
        return BaseMapper.toDomain(entity, ArchiveDomain);
    }

    async findAllByReferenceId(id: string): Promise<ArchiveDomain[]> {
        const entities = await this.ormRepo.findBy({ reference_id: id });
        return entities.map(entity => BaseMapper.toDomain(entity, ArchiveDomain));
    }

    async findAndCount(options: FilterOptions): Promise<[ArchiveDomain[], number]> {
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

        const archives = data.map(item => BaseMapper.toDomain(item, ArchiveDomain));
        return [archives, total];
    }

    async delete(id: string): Promise<void> {
        await this.ormRepo.delete(id);
    }

    async save(archive: ArchiveDomain): Promise<ArchiveDomain> {
        const entity = BaseMapper.toPersistence(archive.toJSON(), ArchiveEntity);
        const saved = await this.ormRepo.save(entity);
        return BaseMapper.toDomain(saved, ArchiveDomain);
    }
}
