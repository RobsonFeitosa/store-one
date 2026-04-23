import { injectable, inject } from 'tsyringe'

import IUsersRepository from '../repositories/IUsersRepository'

import User from '../infra/typeorm/entities/User'
import IProfessionalRepository from '../repositories/IProfessionalRepository'
import { classToClass } from 'class-transformer'

interface UsersProfessionalsIds extends User {
  professionalId: string
}

@injectable()
class IndexUsersTeamsAvailableService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('ProfessionalRepository')
    private professionalRepository: IProfessionalRepository,
  ) {}

  public async execute(): Promise<UsersProfessionalsIds[]> {
    const professionals =
      await this.professionalRepository.findByUserIdNotNull()

    if (professionals.length === 0) {
      return []
    }

    const usersIds = professionals.map((c) => c.user_id)

    const users = await this.usersRepository.findByIds(usersIds)

    const newUsers: UsersProfessionalsIds[] = []

    classToClass(users).forEach((user, index) => {
      newUsers.push({ ...user, professionalId: professionals[index].id })
    })

    return newUsers
  }
}

export default IndexUsersTeamsAvailableService
