import { Module } from '@nestjs/common';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArchiveController } from './infra/http/controllers/archive.controller';
import { CreateArchiveUseCase } from './application/create-archive.use-case';
import { IndexArchiveUseCase } from './application/index-archive.use-case';
import { DeleteArchiveUseCase } from './application/delete-archive.use-case';
import { UpdateArchiveUseCase } from './application/update-archive.use-case';
import { UpdatePrimaryArchiveUseCase } from './application/update-primary-archive.use-case';
import { Archive } from './domain/entities/archive.entity';
import { TypeOrmArchiveRepository } from './infra/database/repositories/typeorm-archive.repository';

import { StorageModule } from 'src/shared/infra/http/providers/storage-provider/storage.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Archive]),
        StorageModule.register(),
    ],
    controllers: [ArchiveController],
    providers: [
        CreateArchiveUseCase,
        IndexArchiveUseCase,
        DeleteArchiveUseCase,
        UpdateArchiveUseCase,
        UpdatePrimaryArchiveUseCase,
        {
            provide: 'ARCHIVE_REPOSITORY_TOKEN',
            useFactory: (ormRepo: Repository<Archive>) => new TypeOrmArchiveRepository(ormRepo),
            inject: [getRepositoryToken(Archive)],
        },

    ],
    exports: [
        'ARCHIVE_REPOSITORY_TOKEN',
        CreateArchiveUseCase,
        IndexArchiveUseCase,
        DeleteArchiveUseCase,
        UpdateArchiveUseCase,
        UpdatePrimaryArchiveUseCase,
    ],
})
export class ArchiveModule { }
