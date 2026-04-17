import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArchiveController } from './infra/http/controllers/archive.controller';
import { CreateArchiveUseCase } from './application/create-archive.use-case';
import { IndexArchiveUseCase } from './application/index-archive.use-case';
import { DeleteArchiveUseCase } from './application/delete-archive.use-case';
import { UpdateArchiveUseCase } from './application/update-archive.use-case';
import { UpdatePrimaryArchiveUseCase } from './application/update-primary-archive.use-case';
import { ArchiveEntity } from './infra/database/entities/archive.entity';
import { TypeOrmArchiveRepository } from './infra/database/repositories/typeorm-archive.repository';
import { StorageModule } from 'src/shared/infra/http/providers/storage-provider/storage.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([ArchiveEntity]),
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
            provide: 'ArchiveRepository',
            useClass: TypeOrmArchiveRepository,
        },
    ],
    exports: [
        'ArchiveRepository',
        CreateArchiveUseCase,
        IndexArchiveUseCase,
        DeleteArchiveUseCase,
        UpdateArchiveUseCase,
        UpdatePrimaryArchiveUseCase,
    ],
})
export class ArchiveModule { }
