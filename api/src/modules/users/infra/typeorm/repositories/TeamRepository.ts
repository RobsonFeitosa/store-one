import { Repository } from 'typeorm'

import dataSource from '@shared/infra/typeorm'

import IPaginationOptionsDTO from '@modules/dtos/IPaginationOptionsDTO'
import ICreateTeamDTO from '@modules/users/dtos/ICreateTeamDTO'
import Team from '../entities/Team'
import ITeamRepository from '@modules/users/repositories/ITeamRepository'

class TeamRepository implements ITeamRepository {
  private ormRepository: Repository<Team>

  constructor() {
    this.ormRepository = dataSource.getRepository(Team)
  }

  public async create(data: ICreateTeamDTO): Promise<Team> {
    const team = this.ormRepository.create(data)

    await this.ormRepository.save(team)

    return team
  }

  public async findById(id: string): Promise<Team | null> {
    const team = await this.ormRepository.findOne({
      where: {
        id,
      },
    })

    return team
  }

  public async findAndCount(
    options: IPaginationOptionsDTO,
  ): Promise<[Team[], number]> {
    const teams = await this.ormRepository.findAndCount({
      take: options.limit,
      skip: (options.page - 1) * options.limit,
      order: {
        created_at: 'DESC',
      },
      relations: ['professional'],
    })

    return teams
  }

  public async delete(id: string): Promise<void> {
    const team = await this.ormRepository.findOne({
      where: {
        id,
      },
    })

    if (team) {
      this.ormRepository.remove(team)
    }
  }

  public async save(data: Team): Promise<Team> {
    return this.ormRepository.save(data)
  }
}

export default TeamRepository
