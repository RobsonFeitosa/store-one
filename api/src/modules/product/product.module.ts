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
import { ShowProductUseCase } from './application/show-product.use-case';
import { UpdateProductUseCase } from './application/update-product.use-case';
import { DeleteProductUseCase } from './application/delete-product.use-case';
import { IndexProductsUseCase } from './application/index-products.use-case';

import { CreateCategoryUseCase } from './application/create-category.use-case';
import { UpdateCategoryUseCase } from './application/update-category.use-case';
import { DeleteCategoryUseCase } from './application/delete-category.use-case';
import { IndexCategoryUseCase } from './application/index-category.use-case';

import { CreateProductDataUseCase } from './application/create-product-data.use-case';

import { CategoryController } from './infra/http/controllers/category.controller';
import { ProductController } from './infra/http/controllers/product.controller';
import { ProductDataController } from './infra/http/controllers/product-data.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Product,
            Category,
            ProductData,
        ]),
    ],
    controllers: [
        CategoryController,
        ProductController,
        ProductDataController,
    ],
    providers: [
        CreateProductUseCase,
        ShowProductUseCase,
        UpdateProductUseCase,
        DeleteProductUseCase,
        IndexProductsUseCase,

        CreateCategoryUseCase,
        UpdateCategoryUseCase,
        DeleteCategoryUseCase,
        IndexCategoryUseCase,

        CreateProductDataUseCase,

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
