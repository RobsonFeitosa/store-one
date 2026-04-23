import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateTimeDiscountUseCase } from '../../../application/create-time-discount.use-case';
import { DeleteTimeDiscountUseCase } from '../../../application/delete-time-discount.use-case';
import { IndexTimeDiscountUseCase } from '../../../application/index-time-discount.use-case';
import { ShowTimeDiscountUseCase } from '../../../application/show-time-discount.use-case';
import { UpdateTimeDiscountUseCase } from '../../../application/update-time-discount.use-case';
import { UpdateRemoveTimeDiscountOfProductUseCase } from '../../../application/update-remove-time-discount-of-product.use-case';
import { CreateTimeDiscountDto } from '../dtos/create-time-discount.dto';

@Controller('time-discounts')
export class TimeDiscountController {
    constructor(
        private readonly createUseCase: CreateTimeDiscountUseCase,
        private readonly deleteUseCase: DeleteTimeDiscountUseCase,
        private readonly indexUseCase: IndexTimeDiscountUseCase,
        private readonly showUseCase: ShowTimeDiscountUseCase,
        private readonly updateUseCase: UpdateTimeDiscountUseCase,
        private readonly removeProductUseCase: UpdateRemoveTimeDiscountOfProductUseCase,
    ) { }

    @Post()
    async create(@Body() data: CreateTimeDiscountDto) {
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

    @Delete('product/:productId')
    async removeProduct(@Param('productId') productId: string) {
        return this.removeProductUseCase.execute(productId);
    }
}
