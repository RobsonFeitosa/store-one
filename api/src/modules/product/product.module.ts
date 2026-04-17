import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './infra/database/entities/product.entity';
import { CategoryEntity } from './infra/database/entities/category.entity';
import { ProductDataEntity } from './infra/database/entities/product-data.entity';
import { TypeOrmProductRepository } from './infra/database/repositories/typeorm-product.repository';
import { TypeOrmCategoryRepository } from './infra/database/repositories/typeorm-category.repository';
import { TypeOrmProductDataRepository } from './infra/database/repositories/typeorm-product-data.repository';
import { CreateProductUseCase } from './application/create-product.use-case';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ProductEntity,
            CategoryEntity,
            ProductDataEntity,
        ]),
    ],
    providers: [
        CreateProductUseCase,
        {
            provide: 'ProductRepository',
            useClass: TypeOrmProductRepository,
        },
        {
            provide: 'CategoryRepository',
            useClass: TypeOrmCategoryRepository,
        },
        {
            provide: 'ProductDataRepository',
            useClass: TypeOrmProductDataRepository,
        },
    ],
    exports: [
        'ProductRepository',
        'CategoryRepository',
        'ProductDataRepository',
        CreateProductUseCase,
    ],
})
export class ProductModule { }
