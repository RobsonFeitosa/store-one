import { injectable, inject } from 'tsyringe'

import ICreateTeamDTO from '../dtos/ICreateTeamDTO'
import Team from '../infra/typeorm/entities/Team'
import ITeamRepository from '../repositories/ITeamRepository'
import AppError from '@shared/errors/AppError'
import IProfessionalRepository from '../repositories/IProfessionalRepository'
import IProductsRepository from '@modules/products/repositories/IProductsRepository'
import Product from '@modules/products/infra/typeorm/entities/Product'

@injectable()
class CreateTeamService {
  constructor(
    @inject('TeamRepository')
    private teamRepository: ITeamRepository,

    @inject('ProfessionalRepository')
    private professionalRepository: IProfessionalRepository,

    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(data: ICreateTeamDTO): Promise<Team> {
    if (data.professionalsIds.length === 0) {
      throw new AppError('Minimum 1 employee')
    }

    const team = await this.teamRepository.create(data)

    for (const professionalId of data.professionalsIds) {
      const professional =
        await this.professionalRepository.findById(professionalId)

      if (!professional) {
        await this.teamRepository.delete(team.id)

        throw new AppError('Professional not found')
      }

      professional.team = team

      await this.professionalRepository.save(professional)
    }

    if (data.productsIds.length > 0) {
      const products: Product[] = []

      for (const productId of data.productsIds) {
        const product = await this.productsRepository.findById(productId)

        if (!product) {
          throw new AppError('Product not found')
        }

        products.push(product)
      }

      team.products = products

      await this.teamRepository.save(team)
    }

    return team
  }
}

export default CreateTeamService
