import { injectable, inject } from 'tsyringe'

import IProfessionalRepository from '../repositories/IProfessionalRepository'
import Professional from '../infra/typeorm/entities/Professional'

@injectable()
class indexProfessionalAvailableService {
  constructor(
    @inject('ProfessionalRepository')
    private professionalRepository: IProfessionalRepository,
  ) {}

  public async execute(): Promise<Professional[]> {
    const professionals = await this.professionalRepository.findAvailable()

    return professionals
  }
}

export default indexProfessionalAvailableService
