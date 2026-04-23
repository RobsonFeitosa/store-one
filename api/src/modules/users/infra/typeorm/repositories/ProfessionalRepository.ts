import { Repository, IsNull, Not } from 'typeorm'
import dataSource from '@shared/infra/typeorm'

import IPaginationOptionsDTO from '@modules/dtos/IPaginationOptionsDTO'
import Professional from '../entities/Professional'
import IProfessionalRepository from '@modules/users/repositories/IProfessionalRepository'
import ICreateProfessionalDTO from '@modules/users/dtos/ICreateProfessionalDTO'

class ProfessionalRepository implements IProfessionalRepository {
  private ormRepository: Repository<Professional>

  constructor() {
    this.ormRepository = dataSource.getRepository(Professional)
  }

  public async create(data: ICreateProfessionalDTO): Promise<Professional> {
    const professional = this.ormRepository.create(data)

    await this.ormRepository.save(professional)

    return professional
  }

  public async findById(id: string): Promise<Professional | null> {
    const professional = await this.ormRepository.findOne({
      where: {
        id,
      },
    })

    return professional
  }

  public async findByInvite(email: string): Promise<Professional | null> {
    const professional = await this.ormRepository.findOne({
      where: {
        invite: email,
      },
    })

    return professional
  }

  public async findByUserId(id: string): Promise<Professional | null> {
    const professional = await this.ormRepository.findOne({
      where: {
        user_id: id,
      },
    })

    return professional
  }

  public async findByTeamId(id: string): Promise<Professional[]> {
    const professionals = await this.ormRepository.find({
      where: {
        team_id: id,
      },
    })

    return professionals
  }

  public async findByUserIdNotNull(): Promise<Professional[]> {
    const professionals = await this.ormRepository.find({
      where: {
        user_id: Not(IsNull()),
        team_id: IsNull(),
      },
    })

    return professionals
  }

  public async findAndCount(
    options: IPaginationOptionsDTO,
  ): Promise<[Professional[], number]> {
    const professionals = await this.ormRepository.findAndCount({
      take: options.limit,
      skip: (options.page - 1) * options.limit,
      order: {
        created_at: 'DESC',
      },
      relations: ['user', 'team'],
    })

    return professionals
  }

  public async findAvailable(): Promise<Professional[]> {
    const builder = this.ormRepository.createQueryBuilder('pr100_professional')
    const professionals = await builder
      .where(
        'pr100_professional.user_id is not null and pr100_professional.actived = true',
      )
      .select()
      .orderBy('RANDOM()')
      .getMany()

    return professionals
  }

  public async delete(id: string): Promise<void> {
    const professional = await this.ormRepository.findOne({
      where: {
        id,
      },
    })

    if (professional) {
      this.ormRepository.remove(professional)
    }
  }

  public async save(data: Professional): Promise<Professional> {
    return this.ormRepository.save(data)
  }
}

export default ProfessionalRepository
