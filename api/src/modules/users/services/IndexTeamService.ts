import { injectable, inject } from 'tsyringe'

import IPaginationOptionsDTO from '@modules/dtos/IPaginationOptionsDTO'
import ITeamRepository from '../repositories/ITeamRepository'
import Team from '../infra/typeorm/entities/Team'

@injectable()
class IndexTeamService {
  constructor(
    @inject('TeamRepository')
    private teamRepository: ITeamRepository,
  ) {}

  public async execute(
    options: IPaginationOptionsDTO,
  ): Promise<[Team[], number]> {
    const teams = await this.teamRepository.findAndCount(options)

    return teams
  }
}

export default IndexTeamService
