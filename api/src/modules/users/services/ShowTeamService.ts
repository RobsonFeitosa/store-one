import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import ITeamRepository from '../repositories/ITeamRepository'
import Team from '../infra/typeorm/entities/Team'

@injectable()
class ShowTeamService {
  constructor(
    @inject('TeamRepository')
    private teamRepository: ITeamRepository,
  ) {}

  public async execute(teamId: string): Promise<Team> {
    const team = await this.teamRepository.findById(teamId)

    if (!team) throw new AppError('Team not found', 404)

    return team
  }
}

export default ShowTeamService
