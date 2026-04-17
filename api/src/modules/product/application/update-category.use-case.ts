import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Category } from "../domain/entities/category.entity";
import type { CategoryRepository } from "../domain/repositories/category.repository";

interface IRequest {
  category_id: string
  name?: string
  parent_id?: string
  level?: string
}

@Injectable()
export class UpdateCategoryUseCase {
  constructor(
    @Inject('CATEGORY_REPOSITORY_TOKEN')
    private readonly categoriesRepository: CategoryRepository,
  ) {}

  public async execute({
    category_id,
    name,
    parent_id,
    level,
  }: IRequest): Promise<Category> {
    const category = await this.categoriesRepository.findById(category_id)

    if (!category) {
      throw new NotFoundException('This category does not exist')
    }

    if (name !== undefined) category.name = name
    if (level !== undefined) category.level = Number(level)
    if (parent_id !== undefined) category.parent_id = parent_id

    return this.categoriesRepository.update(category)
  }
}
