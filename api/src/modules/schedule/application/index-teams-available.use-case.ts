import { Inject, Injectable } from '@nestjs/common'
import ITeamRepository from 'src/modules/users/repositories/ITeamRepository'
import Team from 'src/modules/users/infra/typeorm/entities/Team'

@Injectable()
export class IndexTeamsAvailableUseCase {
  constructor(
    @Inject('TEAM_REPOSITORY_TOKEN')
    private teamRepository: ITeamRepository,
  ) {}

  async execute(): Promise<Team[]> {
    return await this.teamRepository.findByServices()
  }
}
