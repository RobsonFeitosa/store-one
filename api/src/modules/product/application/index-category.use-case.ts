import { Inject, Injectable } from "@nestjs/common";
import { Category } from "../domain/entities/category.entity";
import type { CategoryRepository } from "../domain/repositories/category.repository";

interface IPaginationOptionsDTO {
    page: number;
    limit: number;
}

@Injectable()
export class IndexCategoryUseCase {
  constructor(
    @Inject('CATEGORY_REPOSITORY_TOKEN')
    private readonly categoriesRepository: CategoryRepository,
  ) {}

  public async execute(
    options: IPaginationOptionsDTO,
    type: string,
  ): Promise<[Category[], number]> {
    return this.categoriesRepository.findAndCount(
      options,
      type,
    )
  }
}
