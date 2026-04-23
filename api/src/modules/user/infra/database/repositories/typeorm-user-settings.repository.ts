import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import PaginationOptionsDTO from 'src/shared/domain/helpers/dtos/pagination-opions.dto';
import { UserSettings } from '../../../domain/entities/user-settings.entity';
import UserSettingsRepository, { ICreateUserSettingsDTO } from '../../../domain/repositories/user-settings.repository';

@Injectable()
export class TypeOrmUserSettingsRepository implements UserSettingsRepository {
    constructor(
        private readonly ormRepo: Repository<UserSettings>
    ) { }

    async create(userData: ICreateUserSettingsDTO): Promise<UserSettings> {
        const userSettings = this.ormRepo.create(userData);
        const saved = await this.ormRepo.save(userSettings);
        return saved;
    }

    async findById(id: string): Promise<UserSettings | null> {
        const entity = await this.ormRepo.findOne({
            where: { id }
        });

        return entity;
    }

    async findAndCount(options: PaginationOptionsDTO): Promise<{ data: UserSettings[]; total: number; }> {
        const { page = 1, limit = 10 } = options;
        const skip = (page - 1) * limit;

        const [data, total] = await this.ormRepo.findAndCount({
            take: limit,
            skip,
        });

        return { data, total };
    }

    async save(userSettings: UserSettings): Promise<UserSettings> {
        const saved = await this.ormRepo.save(userSettings);
        return saved;
    }
}
