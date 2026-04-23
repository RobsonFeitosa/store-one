import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateProductProviderUseCase } from '../../../application/create-product-provider.use-case';
import { DeleteProductProviderUseCase } from '../../../application/delete-product-provider.use-case';
import { IndexProductProvidersUseCase } from '../../../application/index-product-providers.use-case';
import { ShowProductProviderUseCase } from '../../../application/show-product-provider.use-case';
import { UpdateProductProviderUseCase } from '../../../application/update-product-provider.use-case';

@Controller('providers')
export class ProviderController {
    constructor(
        private readonly createUseCase: CreateProductProviderUseCase,
        private readonly deleteUseCase: DeleteProductProviderUseCase,
        private readonly indexUseCase: IndexProductProvidersUseCase,
        private readonly showUseCase: ShowProductProviderUseCase,
        private readonly updateUseCase: UpdateProductProviderUseCase,
    ) { }

    @Post()
    async create(@Body() data: any) {
        return this.createUseCase.execute(data);
    }

    @Get()
    async index() {
        return this.indexUseCase.execute();
    }

    @Get(':id')
    async show(@Param('id') id: string) {
        return this.showUseCase.execute(id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() data: any) {
        return this.updateUseCase.execute({ id, ...data });
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.deleteUseCase.execute(id);
    }
}
