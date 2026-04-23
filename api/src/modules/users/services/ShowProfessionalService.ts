import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import IProfessionalRepository from '../repositories/IProfessionalRepository'
import Professional from '../infra/typeorm/entities/Professional'

@injectable()
class ShowProfessionalService {
  constructor(
    @inject('ProfessionalRepository')
    private professionalRepository: IProfessionalRepository,
  ) {}

  public async execute(professionalId: string): Promise<Professional> {
    const professional =
      await this.professionalRepository.findById(professionalId)

    if (!professional) throw new AppError('Professional not found', 404)

    return professional
  }
}

export default ShowProfessionalService
