import { injectable, inject } from 'tsyringe'

import IUsersRepository from '../repositories/IUsersRepository'
import IPaginationOptionsDTO from '../../dtos/IPaginationOptionsDTO'

import User from '../infra/typeorm/entities/User'
import IProfessionalRepository from '../repositories/IProfessionalRepository'
import { classToClass } from 'class-transformer'

@injectable()
class IndexUsersProfessionalAvailableService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('ProfessionalRepository')
    private professionalRepository: IProfessionalRepository,
  ) {}

  public async execute(options: IPaginationOptionsDTO): Promise<User[]> {
    const professional = await this.professionalRepository.findAndCount(options)

    const usersIds = professional[0]
      .filter((professional) => !!professional.user_id)
      .map((c) => c.user_id)

    const users = await this.usersRepository.findInNotUsersIds(
      usersIds as string[],
    )

    return classToClass(users)
  }
}

export default IndexUsersProfessionalAvailableService
