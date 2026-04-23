import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateProductAttributeUseCase } from '../../../application/create-product-attribute.use-case';
import { DeleteProductAttributeUseCase } from '../../../application/delete-product-attribute.use-case';
import { IndexProductAttributesUseCase } from '../../../application/index-product-attributes.use-case';
import { UpdateProductAttributeUseCase } from '../../../application/update-product-attribute.use-case';

@Controller('attributes')
export class AttributeController {
    constructor(
        private readonly createUseCase: CreateProductAttributeUseCase,
        private readonly deleteUseCase: DeleteProductAttributeUseCase,
        private readonly indexUseCase: IndexProductAttributesUseCase,
        private readonly updateUseCase: UpdateProductAttributeUseCase,
    ) { }

    @Post()
    async create(@Body() data: any) {
        return this.createUseCase.execute(data);
    }

    @Get('product/:product_id')
    async index(@Param('product_id') product_id: string) {
        return this.indexUseCase.execute(product_id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() data: any) {
        return this.updateUseCase.execute({ attributeId: id, ...data });
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.deleteUseCase.execute(id);
    }
}
