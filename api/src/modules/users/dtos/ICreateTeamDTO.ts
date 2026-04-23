import Team from '../infra/typeorm/entities/Team'

export default interface ICreateTeamDTO
  extends Omit<Team, 'id' | 'created_at' | 'updated_at' | 'professional'> {
  professionalsIds: string[]
  productsIds: string[]
}
