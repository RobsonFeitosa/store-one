import { Module } from '@nestjs/common';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './domain/entities/product.entity';
import { Category } from './domain/entities/category.entity';
import { ProductData } from './domain/entities/product-data.entity';
import { TypeOrmProductRepository } from './infra/database/repositories/typeorm-product.repository';
import { TypeOrmCategoryRepository } from './infra/database/repositories/typeorm-category.repository';
import { TypeOrmProductDataRepository } from './infra/database/repositories/typeorm-product-data.repository';

import { CreateProductUseCase } from './application/create-product.use-case';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Product,
            Category,
            ProductData,
        ]),
    ],
    providers: [
        CreateProductUseCase,
        {
            provide: 'PRODUCT_REPOSITORY_TOKEN',
            useFactory: (ormRepo: Repository<Product>) => new TypeOrmProductRepository(ormRepo),
            inject: [getRepositoryToken(Product)],
        },
        {
            provide: 'CATEGORY_REPOSITORY_TOKEN',
            useFactory: (ormRepo: Repository<Category>) => new TypeOrmCategoryRepository(ormRepo),
            inject: [getRepositoryToken(Category)],
        },
        {
            provide: 'PRODUCT_DATA_REPOSITORY_TOKEN',
            useFactory: (ormRepo: Repository<ProductData>) => new TypeOrmProductDataRepository(ormRepo),
            inject: [getRepositoryToken(ProductData)],
        },


    ],
    exports: [
        'PRODUCT_REPOSITORY_TOKEN',
        'CATEGORY_REPOSITORY_TOKEN',
        'PRODUCT_DATA_REPOSITORY_TOKEN',

        CreateProductUseCase,
    ],
})
export class ProductModule { }
