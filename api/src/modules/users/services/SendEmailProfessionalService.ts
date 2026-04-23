import { injectable, inject } from 'tsyringe'

import path from 'path'
import AppError from '@shared/errors/AppError'

import IProfessionalRepository from '../repositories/IProfessionalRepository'
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider'

@injectable()
class SendEmailProfessionalService {
  constructor(
    @inject('ProfessionalRepository')
    private professionalRepository: IProfessionalRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute(email: string): Promise<void> {
    const professional = await this.professionalRepository.findByInvite(email)

    if (!professional) throw new AppError('Professional not found', 404)

    this.sendActivedUserEmail(email)
  }

  private async sendActivedUserEmail(invite: string) {
    const activedTemplate = path.resolve(__dirname, '..', 'views', 'invite.hbs')

    await this.mailProvider.sendMail({
      to: {
        name: 'invite',
        email: invite,
      },
      subject: '[LemonadeTechnologies] Convite de profissional',
      templateData: {
        file: activedTemplate,
        variables: {
          link: `${process.env.APP_WEB_URL}/signup/?invite=${invite}`,
        },
      },
    })
  }
}

export default SendEmailProfessionalService
