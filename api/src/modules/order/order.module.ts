import { Module } from '@nestjs/common';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './domain/entities/order.entity';
import { OrderProduct } from './domain/entities/order-product.entity';
import { OrderStatus } from './domain/entities/order-status.entity';
import { TypeOrmOrderRepository } from './infra/database/repositories/typeorm-order.repository';
import { TypeOrmOrderProductRepository } from './infra/database/repositories/typeorm-order-product.repository';
import { TypeOrmOrderStatusRepository } from './infra/database/repositories/typeorm-order-status.repository';
import { CreateOrderUseCase } from './application/create-order.use-case';
import { ProductModule } from '../product/product.module';
import { UserModule } from '../user/user.module';


@Module({
    imports: [
        TypeOrmModule.forFeature([
            Order,
            OrderProduct,
            OrderStatus,
        ]),
        ProductModule,
        UserModule,
    ],
    providers: [
        CreateOrderUseCase,
        {
            provide: 'ORDER_REPOSITORY_TOKEN',
            useFactory: (ormRepo: Repository<Order>) => new TypeOrmOrderRepository(ormRepo),
            inject: [getRepositoryToken(Order)],
        },
        {
            provide: 'ORDER_PRODUCT_REPOSITORY_TOKEN',
            useFactory: (ormRepo: Repository<OrderProduct>) => new TypeOrmOrderProductRepository(ormRepo),
            inject: [getRepositoryToken(OrderProduct)],
        },
        {
            provide: 'ORDER_STATUS_REPOSITORY_TOKEN',
            useFactory: (ormRepo: Repository<OrderStatus>) => new TypeOrmOrderStatusRepository(ormRepo),
            inject: [getRepositoryToken(OrderStatus)],
        },


    ],
    exports: [
        'ORDER_REPOSITORY_TOKEN',
        'ORDER_PRODUCT_REPOSITORY_TOKEN',
        'ORDER_STATUS_REPOSITORY_TOKEN',

        CreateOrderUseCase,
    ],
})
export class OrderModule { }
