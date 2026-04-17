import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Category } from "../domain/entities/category.entity";
import type { CategoryRepository } from "../domain/repositories/category.repository";

interface IRequest {
  name: string
  parent_id?: string
  type: string
}

@Injectable()
export class CreateCategoryUseCase {
  constructor(
    @Inject('CATEGORY_REPOSITORY_TOKEN')
    private readonly categoriesRepository: CategoryRepository,
  ) {}

  public async execute({ name, parent_id, type }: IRequest): Promise<Category> {
    let lvlCount = 0

    if (parent_id !== undefined && parent_id !== null) {
      const category = await this.categoriesRepository.findById(parent_id)

      if (category) {
        lvlCount = Number(category?.level) + 1
      }
    }

    const category = new Category({
      name,
      type,
      parent_id,
      level: lvlCount,
    });

    return this.categoriesRepository.create(category)
  }
}
