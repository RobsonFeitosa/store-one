import { injectable, inject } from 'tsyringe'

import path from 'path'

import ICreateProfessionalDTO from '../dtos/ICreateProfessionalDTO'
import IProfessionalRepository from '../repositories/IProfessionalRepository'
import Professional from '../infra/typeorm/entities/Professional'
import AppError from '@shared/errors/AppError'
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider'
import IUsersRepository from '../repositories/IUsersRepository'

@injectable()
class CreateProfessionalService {
  constructor(
    @inject('ProfessionalRepository')
    private professionalRepository: IProfessionalRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(data: ICreateProfessionalDTO): Promise<Professional> {
    if (data.invite) {
      const userInviteExist = await this.usersRepository.findByEmail(
        data.invite,
      )
      const professionalExist = await this.professionalRepository.findByInvite(
        data.invite,
      )

      if (professionalExist) {
        throw new AppError('This professional has already been invited')
      }

      if (userInviteExist) {
        const professionalExist =
          await this.professionalRepository.findByUserId(userInviteExist.id)

        if (professionalExist) {
          throw new AppError('This professional has already been invited')
        }
      }

      this.sendActivedUserEmail(data.invite)
    }

    const professional = await this.professionalRepository.create(data)

    return professional
  }

  public async sendActivedUserEmail(invite: string) {
    const activedTemplate = path.resolve(__dirname, '..', 'views', 'invite.hbs')

    await this.mailProvider.sendMail({
      to: {
        name: 'invite',
        email: invite,
      },
      subject: '[LemonadeTechnologies] Convite de profissinal',
      templateData: {
        file: activedTemplate,
        variables: {
          link: `${process.env.APP_WEB_URL}/signup/?invite=${invite}`,
        },
      },
    })
  }
}

export default CreateProfessionalService
