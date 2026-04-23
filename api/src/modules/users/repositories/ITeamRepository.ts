import IPaginationOptionsDTO from '@modules/dtos/IPaginationOptionsDTO'
import ICreateTeamDTO from '../dtos/ICreateTeamDTO'
import Team from '../infra/typeorm/entities/Team'

export default interface ITeamRepository {
  create(data: ICreateTeamDTO): Promise<Team>
  findById(id: string): Promise<Team | null>
  findAndCount(options: IPaginationOptionsDTO): Promise<[Team[], number]>
  delete(id: string): Promise<void>
  save(data: Team): Promise<Team>
}
