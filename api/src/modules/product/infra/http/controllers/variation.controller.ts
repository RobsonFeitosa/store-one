import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateProductVariationUseCase } from '../../../application/create-product-variation.use-case';
import { DeleteProductVariationUseCase } from '../../../application/delete-product-variation.use-case';
import { IndexProductVariationsUseCase } from '../../../application/index-product-variations.use-case';
import { ShowProductVariationUseCase } from '../../../application/show-product-variation.use-case';
import { UpdateProductVariationUseCase } from '../../../application/update-product-variation.use-case';

@Controller('variations')
export class VariationController {
    constructor(
        private readonly createUseCase: CreateProductVariationUseCase,
        private readonly deleteUseCase: DeleteProductVariationUseCase,
        private readonly indexUseCase: IndexProductVariationsUseCase,
        private readonly showUseCase: ShowProductVariationUseCase,
        private readonly updateUseCase: UpdateProductVariationUseCase,
    ) { }

    @Post()
    async create(@Body() data: any) {
        return this.createUseCase.execute(data);
    }

    @Get('attribute/:attribute_id')
    async index(@Param('attribute_id') attribute_id: string) {
        return this.indexUseCase.execute(attribute_id);
    }

    @Get(':id')
    async show(@Param('id') id: string) {
        return this.showUseCase.execute(id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() data: any) {
        return this.updateUseCase.execute({ variationId: id, ...data });
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.deleteUseCase.execute(id);
    }
}
