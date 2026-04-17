import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './infra/http/controllers/user.controller';
import { CreateUserUseCase } from './application/create-user.use-case';
import { UserEntity } from './infra/database/entities/user.entity';
import { UserSettingsEntity } from './infra/database/entities/user-settings.entity';
import { TypeOrmUserRepository } from './infra/database/repositories/typeorm-user.repository';
import { StorageModule } from 'src/shared/infra/http/providers/storage-provider/storage.module';
import { UploadAvatarController } from './infra/http/controllers/upload-avatar-user.controller';
import { UploadAvatarUseCase } from './application/upload-avatar-user.use-case';
import { IndexUserUseCase } from './application/index-user.use-case';
import { MessageBrokerModule } from 'src/shared/infra/http/providers/message-broker-provider/message-broker.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity, UserSettingsEntity]),
        StorageModule.register(),
        MessageBrokerModule.register(),
    ],
    controllers: [UserController, UploadAvatarController],
    providers: [
        CreateUserUseCase,
        UploadAvatarUseCase,
        IndexUserUseCase,

        {
            provide: 'UserRepository',
            useClass: TypeOrmUserRepository,
        },
    ],
    exports: ['UserRepository']
})
export class UserModule { }