import Professional from '../infra/typeorm/entities/Professional'

type ICreateProfessionalDTO = Omit<
  Professional,
  'id' | 'created_at' | 'updated_at'
>

export default ICreateProfessionalDTO
