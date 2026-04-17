import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { User as UserDomain } from "src/modules/user/domain/entities/user.entity";
import { UserRepository } from "src/modules/user/domain/repositories/user.repository";
import { UserEntity } from '../entities/user.entity';
import { BaseMapper } from 'src/shared/infra/database/base.mapper';
import { FilterOptions } from 'src/modules/user/domain/types/filter-options';

@Injectable()
export class TypeOrmUserRepository implements UserRepository {
    constructor(
        @InjectRepository(UserEntity)
        private readonly ormRepo: Repository<UserEntity>
    ) { }

    async create(user: UserDomain): Promise<UserDomain> {
        const entity = BaseMapper.toPersistence(user.toJSON(), UserEntity);

        const saved = await this.ormRepo.save(entity);

        return BaseMapper.toDomain(saved, UserDomain);
    }

    async findById(id: string): Promise<UserDomain | null> {
        const entity = await this.ormRepo.findOneBy({ id });

        if (!entity) return null;

        return BaseMapper.toDomain(entity, UserDomain);
    }

    async findByEmail(email: string): Promise<UserDomain | null> {
        const entity = await this.ormRepo.findOneBy({ email });

        if (!entity) return null;

        return BaseMapper.toDomain(entity, UserDomain);
    }

    async findAll(filterOptions: FilterOptions): Promise<[UserDomain[], number]> {
        const { page = 1, limit = 10, search } = filterOptions;

        const skip = (page - 1) * limit;


        const [userData, total] = await this.ormRepo.findAndCount({
            take: limit,
            skip,
            order: { name: 'DESC' },
            where: search ? [
                {
                    name: ILike(`%${search}%`),
                },
            ] : undefined,
        });

        const users = userData.map((user) => BaseMapper.toDomain(user, UserDomain))

        return [users, total]
    }

    async delete(id: string): Promise<void> {
        await this.ormRepo.delete(id);
    }

    async save(user: UserDomain): Promise<UserDomain> {
        const entity = BaseMapper.toPersistence(user.toJSON(), UserEntity);

        const saved = await this.ormRepo.save(entity);

        return BaseMapper.toDomain(saved, UserDomain);
    }
}