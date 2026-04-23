import { injectable, inject } from 'tsyringe'

import ITeamRepository from '@modules/users/repositories/ITeamRepository'
import Team from '@modules/users/infra/typeorm/entities/Team'

@injectable()
class IndexTeamsAvailableService {
  constructor(
    @inject('TeamRepository')
    private teamRepository: ITeamRepository,
  ) {}

  public async execute(): Promise<Team[]> {
    const teams = await this.teamRepository.findByServices()

    return teams
  }
}

export default IndexTeamsAvailableService
