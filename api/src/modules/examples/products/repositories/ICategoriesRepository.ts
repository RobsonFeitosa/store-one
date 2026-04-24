import Category from '../infra/typeorm/entities/ProductCategory'

import ICreateCategoriesDTO from '../dtos/ICreateCategoriesDTO'
import IPaginationOptionsDTO from '@modules/dtos/IPaginationOptionsDTO'

export default interface ICategoriesRepository {
  create(data: ICreateCategoriesDTO): Promise<Category>
  findById(id: string): Promise<Category | null>
  findByName(name: string): Promise<Category | null>
  findAndCount(
    options: IPaginationOptionsDTO,
    type: string,
  ): Promise<[Category[], number]>
  delete(id: string): Promise<void>
  update({ name, parent_id }: ICreateCategoriesDTO): Promise<Category>
  save(category: Category): Promise<Category>
  All(): Promise<Category[]>
}
