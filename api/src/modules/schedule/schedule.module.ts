import { Module } from '@nestjs/common'
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Scheduling } from './domain/entities/scheduling.entity'
import { TypeOrmSchedulingRepository } from './infra/database/typeorm/repositories/typeorm-scheduling.repository'
import { CreateSchedulingUseCase } from './application/create-scheduling.use-case'
import { IndexSchedulingUseCase } from './application/index-scheduling.use-case'
import { ShowSchedulingUseCase } from './application/show-scheduling.use-case'
import { DeleteSchedulingUseCase } from './application/delete-scheduling.use-case'
import { IndexTeamsAvailableUseCase } from './application/index-teams-available.use-case'
import { SchedulingController } from './infra/http/controllers/scheduling.controller'
import Team from 'src/modules/users/infra/typeorm/entities/Team'
import TeamRepository from 'src/modules/users/infra/typeorm/repositories/TeamRepository'

@Module({
  imports: [TypeOrmModule.forFeature([Scheduling, Team])],
  controllers: [SchedulingController],
  providers: [
    CreateSchedulingUseCase,
    IndexSchedulingUseCase,
    ShowSchedulingUseCase,
    DeleteSchedulingUseCase,
    IndexTeamsAvailableUseCase,
    {
      provide: 'SCHEDULING_REPOSITORY_TOKEN',
      useFactory: (ormRepo: Repository<Scheduling>) =>
        new TypeOrmSchedulingRepository(ormRepo),
      inject: [getRepositoryToken(Scheduling)],
    },
    {
      provide: 'TEAM_REPOSITORY_TOKEN',
      useClass: TeamRepository,
    },
  ],
  exports: ['SCHEDULING_REPOSITORY_TOKEN'],
})
export class ScheduleModule {}
