// import { IArchiveDTO } from '@/pages/dtos/archive.dto'
// import { ITeamsDTO } from './teams.dto'
// import { IWishDTO } from '@/pages/dtos/wishProduct.dto'
// import { ITimeDiscountDTO } from '@/pages/admin/dtos/timeDiscount.dto'

// export interface IServiceDTO {
//   id: string
//   name: string
//   description?: string
//   time: string
//   published?: string
//   visibility?: string
//   images?: IArchiveDTO[]
//   slug: string
//   wish: IWishDTO | null
//   team?: ITeamsDTO
//   time_discount: ITimeDiscountDTO | null
//   price: number
//   created_at: Date
//   deleted_at: Date
//   updated_at: Date
// }

// export interface ICreateServiceDTO
//   extends Omit<
//     IServiceDTO,
//     'id' | 'images' | 'slug' | 'deleted_at' | 'created_at' | 'updated_at'
//   > {
//   images?: File[]
//   image_primary?: File
// }
