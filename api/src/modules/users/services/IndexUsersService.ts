import { injectable, inject } from 'tsyringe'

import IUsersRepository from '../repositories/IUsersRepository'
import IPaginationOptionsDTO from '../../dtos/IPaginationOptionsDTO'

import User from '../infra/typeorm/entities/User'

@injectable()
class IndexUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(
    options: IPaginationOptionsDTO,
  ): Promise<[User[], number]> {
    const users = await this.usersRepository.findAndCount(options)

    return users
  }
}

export default IndexUsersService
