import { Module } from '@nestjs/common';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserController } from './infra/http/controllers/user.controller';
import { CreateUserUseCase } from './application/create-user.use-case';
import { User } from './domain/entities/user.entity';
import { UserSettings } from './domain/entities/user-settings.entity';
import { TypeOrmUserRepository } from './infra/database/repositories/typeorm-user.repository';


import { StorageModule } from 'src/shared/infra/http/providers/storage-provider/storage.module';
import { UploadAvatarController } from './infra/http/controllers/upload-avatar-user.controller';
import { UploadAvatarUseCase } from './application/upload-avatar-user.use-case';
import { IndexUserUseCase } from './application/index-user.use-case';
import { MessageBrokerModule } from 'src/shared/infra/http/providers/message-broker-provider/message-broker.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, UserSettings]),
        StorageModule.register(),
        MessageBrokerModule.register(),
    ],
    controllers: [UserController, UploadAvatarController],
    providers: [
        CreateUserUseCase,
        UploadAvatarUseCase,
        IndexUserUseCase,

        {
            provide: 'USER_REPOSITORY_TOKEN',
            useFactory: (ormRepo: Repository<User>) => new TypeOrmUserRepository(ormRepo),
            inject: [getRepositoryToken(User)],
        },

    ],
    exports: ['USER_REPOSITORY_TOKEN']
})
export class UserModule { }