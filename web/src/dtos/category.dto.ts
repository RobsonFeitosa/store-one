export interface ICategoryDTO {
  name: string
  parent_id?: string
  id: string
  level: string
  type: string
  subCategories?: ICategoryDTO[]
}

export type ICreateCategoryDTO = Omit<ICategoryDTO, 'id' | 'level'>
