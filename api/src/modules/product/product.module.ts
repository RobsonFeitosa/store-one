import { Module } from '@nestjs/common';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from './domain/entities/product.entity';
import { Category } from './domain/entities/category.entity';
import { ProductData } from './domain/entities/product-data.entity';
import { Coupon } from './domain/entities/coupon.entity';
import { TimeDiscount } from './domain/entities/time-discount.entity';
import { ProductProvider } from './domain/entities/product-provider.entity';
import { ProductAttribute } from './domain/entities/product-attribute.entity';
import { ProductVariation } from './domain/entities/product-variation.entity';

import { TypeOrmProductRepository } from './infra/database/repositories/typeorm-product.repository';
import { TypeOrmCategoryRepository } from './infra/database/repositories/typeorm-category.repository';
import { TypeOrmProductDataRepository } from './infra/database/repositories/typeorm-product-data.repository';
import { TypeOrmCouponRepository } from './infra/database/repositories/typeorm-coupon.repository';
import { TypeOrmTimeDiscountRepository } from './infra/database/repositories/typeorm-time-discount.repository';
import { TypeOrmProductProviderRepository } from './infra/database/repositories/typeorm-product-provider.repository';
import { TypeOrmProductAttributeRepository } from './infra/database/repositories/typeorm-product-attribute.repository';
import { TypeOrmProductVariationRepository } from './infra/database/repositories/typeorm-product-variation.repository';

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

import { CreateCouponUseCase } from './application/create-coupon.use-case';
import { IndexCouponsUseCase } from './application/index-coupons.use-case';
import { ShowCouponUseCase } from './application/show-coupon.use-case';
import { UpdateStatusCouponUseCase } from './application/update-status-coupon.use-case';

import { CreateTimeDiscountUseCase } from './application/create-time-discount.use-case';
import { DeleteTimeDiscountUseCase } from './application/delete-time-discount.use-case';
import { IndexTimeDiscountUseCase } from './application/index-time-discount.use-case';
import { ShowTimeDiscountUseCase } from './application/show-time-discount.use-case';
import { UpdateTimeDiscountUseCase } from './application/update-time-discount.use-case';
import { UpdateRemoveTimeDiscountOfProductUseCase } from './application/update-remove-time-discount-of-product.use-case';

import { CreateProductProviderUseCase } from './application/create-product-provider.use-case';
import { DeleteProductProviderUseCase } from './application/delete-product-provider.use-case';
import { IndexProductProvidersUseCase } from './application/index-product-providers.use-case';
import { ShowProductProviderUseCase } from './application/show-product-provider.use-case';
import { UpdateProductProviderUseCase } from './application/update-product-provider.use-case';

import { CreateProductAttributeUseCase } from './application/create-product-attribute.use-case';
import { DeleteProductAttributeUseCase } from './application/delete-product-attribute.use-case';
import { IndexProductAttributesUseCase } from './application/index-product-attributes.use-case';
import { UpdateProductAttributeUseCase } from './application/update-product-attribute.use-case';

import { CreateProductVariationUseCase } from './application/create-product-variation.use-case';
import { DeleteProductVariationUseCase } from './application/delete-product-variation.use-case';
import { IndexProductVariationsUseCase } from './application/index-product-variations.use-case';
import { ShowProductVariationUseCase } from './application/show-product-variation.use-case';
import { UpdateProductVariationUseCase } from './application/update-product-variation.use-case';

import { UpdateProductImagePrimaryUseCase } from './application/update-product-image-primary.use-case';
import { ShowEmphasisProductUseCase } from './application/show-emphasis-product.use-case';
import { IndexVariationColorsUseCase } from './application/index-variation-colors.use-case';
import { IndexVariationSizesUseCase } from './application/index-variation-sizes.use-case';

import { CategoryController } from './infra/http/controllers/category.controller';
import { ProductController } from './infra/http/controllers/product.controller';
import { ProductDataController } from './infra/http/controllers/product-data.controller';
import { CouponController } from './infra/http/controllers/coupon.controller';
import { TimeDiscountController } from './infra/http/controllers/time-discount.controller';
import { ProviderController } from './infra/http/controllers/provider.controller';
import { AttributeController } from './infra/http/controllers/attribute.controller';
import { VariationController } from './infra/http/controllers/variation.controller';

import { UserModule } from '../user/user.module';
import { ArchiveModule } from '../archive/archive.module';
import { StorageModule } from 'src/shared/infra/http/providers/storage-provider/storage.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Product,
            Category,
            ProductData,
            Coupon,
            TimeDiscount,
            ProductProvider,
            ProductAttribute,
            ProductVariation,
        ]),
        UserModule,
        ArchiveModule,
        StorageModule.register(),
    ],
    controllers: [
        CategoryController,
        ProductController,
        ProductDataController,
        CouponController,
        TimeDiscountController,
        ProviderController,
        AttributeController,
        VariationController,
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

        CreateCouponUseCase,
        IndexCouponsUseCase,
        ShowCouponUseCase,
        UpdateStatusCouponUseCase,

        CreateTimeDiscountUseCase,
        DeleteTimeDiscountUseCase,
        IndexTimeDiscountUseCase,
        ShowTimeDiscountUseCase,
        UpdateTimeDiscountUseCase,
        UpdateRemoveTimeDiscountOfProductUseCase,

        CreateProductProviderUseCase,
        DeleteProductProviderUseCase,
        IndexProductProvidersUseCase,
        ShowProductProviderUseCase,
        UpdateProductProviderUseCase,

        CreateProductAttributeUseCase,
        DeleteProductAttributeUseCase,
        IndexProductAttributesUseCase,
        UpdateProductAttributeUseCase,

        CreateProductVariationUseCase,
        DeleteProductVariationUseCase,
        IndexProductVariationsUseCase,
        ShowProductVariationUseCase,
        UpdateProductVariationUseCase,

        UpdateProductImagePrimaryUseCase,
        ShowEmphasisProductUseCase,
        IndexVariationColorsUseCase,
        IndexVariationSizesUseCase,

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
        {
            provide: 'COUPON_REPOSITORY_TOKEN',
            useFactory: (ormRepo: Repository<Coupon>) => new TypeOrmCouponRepository(ormRepo),
            inject: [getRepositoryToken(Coupon)],
        },
        {
            provide: 'TIME_DISCOUNT_REPOSITORY_TOKEN',
            useFactory: (ormRepo: Repository<TimeDiscount>) => new TypeOrmTimeDiscountRepository(ormRepo),
            inject: [getRepositoryToken(TimeDiscount)],
        },
        {
            provide: 'PRODUCT_PROVIDER_REPOSITORY_TOKEN',
            useFactory: (ormRepo: Repository<ProductProvider>) => new TypeOrmProductProviderRepository(ormRepo),
            inject: [getRepositoryToken(ProductProvider)],
        },
        {
            provide: 'PRODUCT_ATTRIBUTE_REPOSITORY_TOKEN',
            useFactory: (ormRepo: Repository<ProductAttribute>) => new TypeOrmProductAttributeRepository(ormRepo),
            inject: [getRepositoryToken(ProductAttribute)],
        },
        {
            provide: 'PRODUCT_VARIATION_REPOSITORY_TOKEN',
            useFactory: (ormRepo: Repository<ProductVariation>) => new TypeOrmProductVariationRepository(ormRepo),
            inject: [getRepositoryToken(ProductVariation)],
        },
    ],
    exports: [
        'PRODUCT_REPOSITORY_TOKEN',
        'CATEGORY_REPOSITORY_TOKEN',
        'PRODUCT_DATA_REPOSITORY_TOKEN',
        'COUPON_REPOSITORY_TOKEN',
        'TIME_DISCOUNT_REPOSITORY_TOKEN',
        'PRODUCT_PROVIDER_REPOSITORY_TOKEN',
        'PRODUCT_ATTRIBUTE_REPOSITORY_TOKEN',
        'PRODUCT_VARIATION_REPOSITORY_TOKEN',

        CreateProductUseCase,
    ],
})
export class ProductModule { }
