import IPaginationOptionsDTO from '@modules/dtos/IPaginationOptionsDTO'
import Professional from '../infra/typeorm/entities/Professional'
import ICreateProfessionalDTO from '../dtos/ICreateProfessionalDTO'

export default interface IProfessionalRepository {
  create(data: ICreateProfessionalDTO): Promise<Professional>
  findById(id: string): Promise<Professional | null>
  findAndCount(
    options: IPaginationOptionsDTO,
  ): Promise<[Professional[], number]>
  findByUserId(id: string): Promise<Professional | null>
  findAvailable(): Promise<Professional[]>
  findByTeamId(id: string): Promise<Professional[]>
  findByUserIdNotNull(): Promise<Professional[]>
  findByInvite(email: string): Promise<Professional | null>
  delete(id: string): Promise<void>
  save(data: Professional): Promise<Professional>
}
