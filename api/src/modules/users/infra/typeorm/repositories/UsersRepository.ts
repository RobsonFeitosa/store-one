import { In, Repository } from 'typeorm'

import dataSource from '@shared/infra/typeorm'
import IPaginationOptionsDTO from '@modules/dtos/IPaginationOptionsDTO'

import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO'

import User from '../entities/User'

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>

  constructor() {
    this.ormRepository = dataSource.getRepository(User)
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(userData)

    await this.ormRepository.save(user)

    return user
  }

  public async findById(id: string): Promise<User | null> {
    const builder = this.ormRepository.createQueryBuilder('users')
    const data = await builder
      .leftJoinAndSelect('users.settings', 'users_settings')
      .where('users.id = :id', { id })
      .getOne()
    return data
  }

  public async findByIds(ids: string[]): Promise<User[]> {
    const isFulled = ids.length !== 0 || null

    const users = this.ormRepository.find({
      where: {
        id: In(ids),
      },
    })
    return users
  }

  public async findAndCount(
    options: IPaginationOptionsDTO,
  ): Promise<[User[], number]> {
    const users = await this.ormRepository.findAndCount({
      take: options.limit,
      skip: (options.page - 1) * options.limit,
      relations: ['settings'],
    })

    return users
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = await this.ormRepository.findOne({
      where: { email },
      relations: ['settings'],
    })

    return user
  }

  public async findInNotUsersIds(usersIds: string[]): Promise<User[]> {
    if (usersIds.length === 0) {
      const users = await this.ormRepository.find()
      return users
    }

    const users = await this.ormRepository
      .createQueryBuilder('pr100_professional')
      .where('pr100_professional.id NOT IN (:...usersIds)', {
        usersIds,
      })
      .getMany()
    return users
  }

  public async findUserForName(name: string): Promise<User | null> {
    const result = await this.ormRepository.findOne({
      where: {
        name,
      },
    })

    return result
  }

  public async delete(id: string): Promise<void> {
    const user = await this.ormRepository.findOne({
      where: {
        id,
      },
    })

    if (user) {
      this.ormRepository.remove(user)
    }
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user)
  }
}

export default UsersRepository
