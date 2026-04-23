import { IArchiveDTO } from '@/pages/admin/dtos/archive.dto'

export interface IProviderDTO {
  id: string
  name: string
  phone1: string
  phone2: string
  email: string
  address: string
  created_at: Date
  updated_at: Date
  image: IArchiveDTO | null
}

export interface ICreateProviderDTO
  extends Omit<IProviderDTO, 'id' | 'image' | 'created_at' | 'updated_at'> {
  image: File
}

