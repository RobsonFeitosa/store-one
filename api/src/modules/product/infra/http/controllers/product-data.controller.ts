import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateProductDataUseCase } from '../../../application/create-product-data.use-case';
import { ShowProductUseCase } from '../../../application/show-product.use-case';
import { UpdateProductUseCase } from '../../../application/update-product.use-case';
import { DeleteProductUseCase } from '../../../application/delete-product.use-case';
import { CreateProductDataDto } from '../dtos/create-product-data.dto';
import { UpdateProductDto } from '../dtos/update-product.dto';

// In the legacy code, data controller also manipulated Products and showed Products.
@Controller('products-data')
export class ProductDataController {
    constructor(
        private readonly createProductDataUseCase: CreateProductDataUseCase,
        private readonly showProductUseCase: ShowProductUseCase,
        private readonly updateProductUseCase: UpdateProductUseCase,
        private readonly deleteProductUseCase: DeleteProductUseCase,
    ) { }

    @Post(':productId')
    async create(@Param('productId') productId: string, @Body() data: CreateProductDataDto) {
        return this.createProductDataUseCase.execute({
            productId,
            payload: data,
        });
    }

    @Put(':productId')
    async update(@Param('productId') productId: string, @Body() data: UpdateProductDto) {
        return this.updateProductUseCase.execute({
            productId,
            ...data,
        });
    }

    @Get(':slug/:id')
    async show(@Param('slug') slug: string, @Param('id') id: string) {
        return this.showProductUseCase.execute(slug, id);
    }

    @Delete(':productId')
    async delete(@Param('productId') productId: string) {
        return this.deleteProductUseCase.execute(productId);
    }
}
