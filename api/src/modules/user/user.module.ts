import { Module } from '@nestjs/common';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserController } from './infra/http/controllers/user.controller';
import { CreateUserUseCase } from './application/create-user.use-case';
import { User } from './domain/entities/user.entity';
import { UserSettings } from './domain/entities/user-settings.entity';
import { TypeOrmUserRepository } from './infra/database/repositories/typeorm-user.repository';
import { TypeOrmUserSettingsRepository } from './infra/database/repositories/typeorm-user-settings.repository';


import { StorageModule } from 'src/shared/infra/http/providers/storage-provider/storage.module';
import { UploadAvatarController } from './infra/http/controllers/upload-avatar-user.controller';
import { UploadAvatarUseCase } from './application/upload-avatar-user.use-case';
import { IndexUserUseCase } from './application/index-user.use-case';
import { MessageBrokerModule } from 'src/shared/infra/http/providers/message-broker-provider/message-broker.module';
import { AuthenticateUserUseCase } from './application/authenticate-user.use-case';
import { AuthenticateUserController } from './infra/http/controllers/authenticate-user.controller';
import BCryptHashProvider from './infra/providers/HashProvider/implementations/BCryptHashProvider';
import { Professional } from 'src/modules/users/infra/typeorm/entities/Professional';
import Team from 'src/modules/users/infra/typeorm/entities/Team';
import { ProfessionalController } from 'src/modules/user/infra/http/controllers/professional.controller';
import { IndexProfessionalsUseCase } from 'src/modules/user/application/index-professionals.use-case';
import { IndexProfessionalsAvailablesUseCase } from 'src/modules/user/application/index-professionals-availables.use-case';
import { ShowBlockedDatesUseCase } from 'src/modules/user/application/show-blocked-dates.use-case';
import { TypeOrmProfessionalRepository } from 'src/modules/user/infra/database/repositories/typeorm-professional.repository';
import { TypeOrmTimeIntervalsRepository } from 'src/modules/user/infra/database/repositories/typeorm-time-intervals.repository';
import { TimeIntervals } from 'src/modules/users/infra/typeorm/entities/TimeIntervals';
import { ScheduleModule } from 'src/modules/schedule/schedule.module';
import { ShowAvailableTimeProfessionalsUseCase } from './application/show-available-time-professionals.use-case';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, UserSettings, Professional, Team, TimeIntervals]),
        StorageModule.register(),
        MessageBrokerModule.register(),
        ScheduleModule,
    ],
    controllers: [UserController, UploadAvatarController, AuthenticateUserController, ProfessionalController],
    providers: [
        CreateUserUseCase,
        UploadAvatarUseCase,
        IndexUserUseCase,
        AuthenticateUserUseCase,
        IndexProfessionalsUseCase,
        IndexProfessionalsAvailablesUseCase,
        ShowBlockedDatesUseCase,
        ShowAvailableTimeProfessionalsUseCase,


        {

            provide: 'USER_REPOSITORY_TOKEN',
            useFactory: (ormRepo: Repository<User>) => new TypeOrmUserRepository(ormRepo),
            inject: [getRepositoryToken(User)],
        },
        {
            provide: 'USER_SETTINGS_REPOSITORY_TOKEN',
            useFactory: (ormRepo: Repository<UserSettings>) => new TypeOrmUserSettingsRepository(ormRepo),
            inject: [getRepositoryToken(UserSettings)],
        },

        {
            provide: 'HASH_PROVIDER_TOKEN',
            useClass: BCryptHashProvider,
        },
        {
            provide: 'PROFESSIONAL_REPOSITORY_TOKEN',
            useFactory: (ormRepo: Repository<Professional>) => new TypeOrmProfessionalRepository(ormRepo),
            inject: [getRepositoryToken(Professional)],
        },
        {
            provide: 'TIME_INTERVALS_REPOSITORY_TOKEN',
            useFactory: (ormRepo: Repository<TimeIntervals>) => new TypeOrmTimeIntervalsRepository(ormRepo),
            inject: [getRepositoryToken(TimeIntervals)],
        },
    ],
    exports: ['USER_REPOSITORY_TOKEN', 'USER_SETTINGS_REPOSITORY_TOKEN', 'HASH_PROVIDER_TOKEN']
})
export class UserModule { }