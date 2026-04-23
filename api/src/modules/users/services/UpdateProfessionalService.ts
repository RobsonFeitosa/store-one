import { injectable, inject } from 'tsyringe'

import path from 'path'

import ICreateProfessionalDTO from '../dtos/ICreateProfessionalDTO'
import IProfessionalRepository from '../repositories/IProfessionalRepository'
import Professional from '../infra/typeorm/entities/Professional'
import AppError from '@shared/errors/AppError'
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider'
import IUsersRepository from '../repositories/IUsersRepository'
import ITeamRepository from '../repositories/ITeamRepository'

@injectable()
class UpdateProfessionalService {
  constructor(
    @inject('ProfessionalRepository')
    private professionalRepository: IProfessionalRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('TeamRepository')
    private teamRepository: ITeamRepository,
  ) {}

  public async execute(
    data: ICreateProfessionalDTO,
    professionalId: string,
  ): Promise<Professional> {
    console.log('entrouuuu213')
    const professional =
      await this.professionalRepository.findById(professionalId)

    if (!professional) {
      throw new AppError('Professional not found')
    }

    professional.name = data.name
    professional.function = data.function
    professional.actived = data.actived
    professional.user_id = data.user_id

    if (data.team_id) {
      const team = await this.teamRepository.findById(data.team_id)

      if (!team) {
        throw new AppError('Team not found')
      }
      professional.team = team
      professional.team_id = data.team_id
    }

    if (data.invite !== professional.invite && !professional.user_id) {
      professional.invite = data.invite

      const professionalExist = await this.professionalRepository.findByInvite(
        data.invite,
      )

      if (professionalExist) {
        throw new AppError('This professional has already been invited')
      }

      const userInviteExist = await this.usersRepository.findByEmail(
        data.invite,
      )

      if (userInviteExist) {
        const professionalExist =
          await this.professionalRepository.findByUserId(userInviteExist.id)

        if (professionalExist) {
          throw new AppError('This professional has already been invited')
        }
      }
    }

    await this.professionalRepository.save(professional)

    return professional
  }

  public async sendActivedUserEmail(invite: string) {
    const activedTemplate = path.resolve(__dirname, '..', 'views', 'invite.hbs')

    await this.mailProvider.sendMail({
      to: {
        name: 'invite',
        email: invite,
      },
      subject: '[LemonadeTechnologies] Convite de colaborador',
      templateData: {
        file: activedTemplate,
        variables: {
          link: `${process.env.APP_WEB_URL}/signup/?invite=${invite}`,
        },
      },
    })
  }
}

export default UpdateProfessionalService
