import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './infra/database/entities/order.entity';
import { OrderProductEntity } from './infra/database/entities/order-product.entity';
import { OrderStatusEntity } from './infra/database/entities/order-status.entity';
import { TypeOrmOrderRepository } from './infra/database/repositories/typeorm-order.repository';
import { TypeOrmOrderProductRepository } from './infra/database/repositories/typeorm-order-product.repository';
import { TypeOrmOrderStatusRepository } from './infra/database/repositories/typeorm-order-status.repository';
import { CreateOrderUseCase } from './application/create-order.use-case';
import { ProductModule } from '../product/product.module';
import { UserModule } from '../user/user.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            OrderEntity,
            OrderProductEntity,
            OrderStatusEntity,
        ]),
        ProductModule,
        UserModule,
    ],
    providers: [
        CreateOrderUseCase,
        {
            provide: 'OrderRepository',
            useClass: TypeOrmOrderRepository,
        },
        {
            provide: 'OrderProductRepository',
            useClass: TypeOrmOrderProductRepository,
        },
        {
            provide: 'OrderStatusRepository',
            useClass: TypeOrmOrderStatusRepository,
        },
    ],
    exports: [
        'OrderRepository',
        'OrderProductRepository',
        'OrderStatusRepository',
        CreateOrderUseCase,
    ],
})
export class OrderModule { }
