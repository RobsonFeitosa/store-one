import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Category } from "../domain/entities/category.entity";
import type { CategoryRepository } from "../domain/repositories/category.repository";

@Injectable()
export class DeleteCategoryUseCase {
  constructor(
    @Inject('CATEGORY_REPOSITORY_TOKEN')
    private readonly categoriesRepository: CategoryRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const category = await this.categoriesRepository.findById(id)

    if (!category) {
      throw new NotFoundException('Category not exist')
    }

    await this.categoriesRepository.delete(id)
  }
}
