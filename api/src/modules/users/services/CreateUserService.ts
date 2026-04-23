import { injectable, inject } from 'tsyringe'

import path from 'path'

import AppError from '@shared/errors/AppError'
import IUsersRepository from '../repositories/IUsersRepository'
import IUserSettingsRepository from '../repositories/IUserSettingsRepository'
import IHashProvider from '../providers/HashProvider/models/IHashProvider'
import { UserPromise } from '../dtos/IPromiseUser'
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider'
import IUserTokensRepository from '../repositories/IUserTokensRepository'
import User from '../infra/typeorm/entities/User'
import IProfessionalRepository from '../repositories/IProfessionalRepository'

interface IRequest {
  name: string
  email: string
  password: string
  user_id: string
  level: 1 | 2
  cpf?: string
  phone_number?: string
  actived: boolean
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserSettingsRepository')
    private userSettingsRepository: IUserSettingsRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('ProfessionalRepository')
    private professionalRepository: IProfessionalRepository,
  ) {}

  public async execute(userData: IRequest): Promise<UserPromise> {
    const checkUserExists = await this.usersRepository.findByEmail(
      userData.email,
    )

    if (checkUserExists) {
      throw new AppError('E-mail address already used.')
    }

    const hashedPassword = await this.hashProvider.generateHash(
      userData.password,
    )

    const { name, password, email, ...settings } = userData

    const userSettings = await this.userSettingsRepository.create({
      ...settings,
    })

    const user = await this.usersRepository.create({
      email,
      name,
      password: hashedPassword,
      settings_id: userSettings.id,
    })

    const professional = await this.professionalRepository.findByInvite(
      userData.email,
    )

    if (professional) {
      professional.user_id = user.id
      professional.user = user

      await this.professionalRepository.save(professional)
    }

    await this.sendActivedUserEmail(user)

    const newUser: UserPromise = { ...userSettings, ...user }

    delete newUser.password

    return {
      ...newUser,
      created_at: newUser.created_at,
      updated_at: newUser.updated_at,
    }
  }

  public async sendActivedUserEmail(user: User) {
    const { token } = await this.userTokensRepository.generate(user.id)

    const activedTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'actived_account.hbs',
    )

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[LemonadeTechnologies] Ativação da conta',
      templateData: {
        file: activedTemplate,
        variables: {
          name: user.name,
          token,
          link: `${process.env.APP_WEB_URL}/actived/?token=${token}`,
        },
      },
    })
  }
}

export default CreateUserService
