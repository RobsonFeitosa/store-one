import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'
import IProfessionalRepository from '../repositories/IProfessionalRepository'

@injectable()
class DeleteProfessionalService {
  constructor(
    @inject('ProfessionalRepository')
    private professionalRepository: IProfessionalRepository,
  ) {}

  public async execute(teamId: string): Promise<void> {
    const professional = await this.professionalRepository.findById(teamId)

    if (!professional) throw new AppError('Professional not found', 404)

    await this.professionalRepository.delete(professional.id)
  }
}

export default DeleteProfessionalService
