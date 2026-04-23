import { injectable, inject } from 'tsyringe'

import ICreateTeamDTO from '../dtos/ICreateTeamDTO'
import Team from '../infra/typeorm/entities/Team'
import ITeamRepository from '../repositories/ITeamRepository'
import AppError from '@shared/errors/AppError'
import IProfessionalRepository from '../repositories/IProfessionalRepository'
import IProductsRepository from '@modules/products/repositories/IProductsRepository'

@injectable()
class UpdateTeamService {
  constructor(
    @inject('TeamRepository')
    private teamRepository: ITeamRepository,

    @inject('ProfessionalRepository')
    private professionalRepository: IProfessionalRepository,

    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(data: ICreateTeamDTO, teamId: string): Promise<Team> {
    const team = await this.teamRepository.findById(teamId)

    if (!team) {
      throw new AppError('Team not found')
    }

    team.name = data.name
    team.operation = data.operation

    if (data.product_id) {
      const product = await this.productsRepository.findById(data.product_id)

      if (!product) {
        throw new AppError('Product not found')
      }
      team.product = product
      team.product_id = data.product_id
    }

    await this.teamRepository.save(team)

    if (data.professionalsIds.length === 0) {
      throw new AppError('Minimum 1 employee')
    }

    const professionals = await this.professionalRepository.findByTeamId(
      team.id,
    )

    for (const professional of professionals) {
      professional.team_id = null

      await this.professionalRepository.save(professional)
    }

    for (const professionalId of data.professionalsIds) {
      const professional =
        await this.professionalRepository.findById(professionalId)

      if (!professional) {
        throw new AppError('Professional not found')
      }

      professional.team_id = team.id

      await this.professionalRepository.save(professional)
    }

    return team
  }
}

export default UpdateTeamService
