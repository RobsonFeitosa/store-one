import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateProductUseCase } from '../../../application/create-product.use-case';
import { UpdateProductUseCase } from '../../../application/update-product.use-case';
import { DeleteProductUseCase } from '../../../application/delete-product.use-case';
import { IndexProductsUseCase } from '../../../application/index-products.use-case';
import { ShowProductUseCase } from '../../../application/show-product.use-case';
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
    ) { }

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

    @Get()
    async index(
        @Query('page') page: string = '1',
        @Query('limit') limit: string = '99999',
        @Query('search') search?: string,
    ) {
        return this.indexProductsUseCase.execute({
            page: Number(page),
            limit: Number(limit),
            search,
        });
    }

    @Get(':slug/:id')
    async show(@Param('slug') slug: string, @Param('id') id: string) {
        return this.showProductUseCase.execute(slug, id);
    }
}
