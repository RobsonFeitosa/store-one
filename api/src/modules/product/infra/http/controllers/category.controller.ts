import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { Public } from 'src/shared/infra/http/decorators/public.decorator';
import { CreateCategoryUseCase } from '../../../application/create-category.use-case';
import { UpdateCategoryUseCase } from '../../../application/update-category.use-case';
import { DeleteCategoryUseCase } from '../../../application/delete-category.use-case';
import { IndexCategoryUseCase } from '../../../application/index-category.use-case';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { UpdateCategoryDto } from '../dtos/update-category.dto';

@Controller('categories')
export class CategoryController {
  constructor(
    private readonly createCategoryUseCase: CreateCategoryUseCase,
    private readonly updateCategoryUseCase: UpdateCategoryUseCase,
    private readonly deleteCategoryUseCase: DeleteCategoryUseCase,
    private readonly indexCategoryUseCase: IndexCategoryUseCase,
  ) {}

  @Post()
  async create(@Body() data: CreateCategoryDto) {
    return this.createCategoryUseCase.execute(data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: UpdateCategoryDto) {
    return this.updateCategoryUseCase.execute({
      category_id: id,
      name: data.name,
      parent_id: data.parent_id,
      level: data.level,
    });
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.deleteCategoryUseCase.execute(id);
  }

  @Public()
  @Get()
  async index(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '99999',
    @Query('type') type?: string,
  ) {
    return this.indexCategoryUseCase.execute(
      {
        page: Number(page),
        limit: Number(limit),
      },
      type ? String(type) : '',
    );
  }
}
