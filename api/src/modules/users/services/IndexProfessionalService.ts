import { injectable, inject } from 'tsyringe'

import IPaginationOptionsDTO from '@modules/dtos/IPaginationOptionsDTO'
import IProfessionalRepository from '../repositories/IProfessionalRepository'
import Professional from '../infra/typeorm/entities/Professional'

@injectable()
class IndexProfessionalService {
  constructor(
    @inject('ProfessionalRepository')
    private professionalRepository: IProfessionalRepository,
  ) {}

  public async execute(
    options: IPaginationOptionsDTO,
  ): Promise<[Professional[], number]> {
    const professional = await this.professionalRepository.findAndCount(options)

    return professional
  }
}

export default IndexProfessionalService
