import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Public } from 'src/shared/infra/http/decorators/public.decorator';
import { CreateProductUseCase } from '../../../application/create-product.use-case';
import { UpdateProductUseCase } from '../../../application/update-product.use-case';
import { DeleteProductUseCase } from '../../../application/delete-product.use-case';
import { IndexProductsUseCase } from '../../../application/index-products.use-case';
import { ShowProductUseCase } from '../../../application/show-product.use-case';
import { ShowEmphasisProductUseCase } from '../../../application/show-emphasis-product.use-case';
import { CreateProductDto } from '../dtos/create-product.dto';
import { UpdateProductDto } from '../dtos/update-product.dto';

@Controller('products')
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
    private readonly deleteProductUseCase: DeleteProductUseCase,
    private readonly indexProductsUseCase: IndexProductsUseCase,
    private readonly showProductUseCase: ShowProductUseCase,
    private readonly showEmphasisProductUseCase: ShowEmphasisProductUseCase,
  ) { }

  @Public()
  @Get('emphasis')
  async showEmphasis() {
    return this.showEmphasisProductUseCase.execute();
  }

  @Post()
  async create(@Body() data: CreateProductDto) {
    return this.createProductUseCase.execute(data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: UpdateProductDto) {
    return this.updateProductUseCase.execute({
      productId: id,
      ...data,
    });
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.deleteProductUseCase.execute(id);
  }

  @Public()
  @Get()
  async index(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '99999',
    @Query('search') search?: string,
    @Query('user_id') user_id?: string,
    @Query('onlyDiscount') onlyDiscount?: string,
    @Query('type') type?: 'service' | 'product',
    @Query('timeDiscountPriory') timeDiscountPriory?: string,
    @Query('name') name?: string,
    @Query('quantity') quantity?: string,
    @Query('weight') weight?: string,
    @Query('priceMin') priceMin?: string,
    @Query('priceMax') priceMax?: string,
    @Query('lowPrice') lowPrice?: string,
    @Query('color') color?: string,
    @Query('size') size?: string,
    @Query('highPrice') highPrice?: string,
    @Query('old') old?: string,
    @Query('alphabeticalASC') alphabeticalASC?: string,
    @Query('alphabeticalDESC') alphabeticalDESC?: string,
    @Query('categoryId') categoryId?: string,
    @Query('productIds') productIds?: string,
  ) {
    return this.indexProductsUseCase.execute({
      page: Number(page),
      limit: Number(limit),
      search,
      user_id: this.parseSingleValue(user_id),
      onlyDiscount: onlyDiscount === 'true',
      type,
      timeDiscountPriory: timeDiscountPriory === 'true',
      name,
      quantity: quantity ? Number(quantity) : undefined,
      weight: weight ? Number(weight) : undefined,
      priceMin: priceMin ? Number(priceMin) : undefined,
      priceMax: priceMax ? Number(priceMax) : undefined,
      lowPrice: lowPrice === 'true',
      color,
      size,
      highPrice: highPrice === 'true',
      old: old === 'true',
      alphabeticalASC: alphabeticalASC === 'true',
      alphabeticalDESC: alphabeticalDESC === 'true',
      categoryId: this.parseSingleValue(categoryId),
      productIds,
    });
  }

  private parseSingleValue(value?: string): string | undefined {
    if (!value) return undefined;
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? String(parsed[0]) : String(parsed);
    } catch (e) {
      return value;
    }
  }

  @Public()
  @Get(':slug/:id')
  async show(@Param('slug') slug: string, @Param('id') id: string) {
    return this.showProductUseCase.execute(slug, id);
  }

  @Public()
  @Get(':slug/code/:product_id')
  async showByCode(
    @Param('slug') slug: string,
    @Param('product_id') productId: string,
  ) {
    return this.showProductUseCase.execute(slug, productId);
  }
}
