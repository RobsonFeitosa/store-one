import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { OrderProduct } from "../../../domain/entities/order-product.entity";
import { OrderProductRepository } from "../../../domain/repositories/order-product.repository";

@Injectable()
export class TypeOrmOrderProductRepository implements OrderProductRepository {
    constructor(
        private readonly ormRepo: Repository<OrderProduct>
    ) { }


    async create(data: OrderProduct): Promise<OrderProduct> {
        const saved = await this.ormRepo.save(data);
        return saved;
    }

    async findById(id: string): Promise<OrderProduct | null> {
        const entity = await this.ormRepo.findOneBy({ id });
        return entity;
    }

    async save(orderProduct: OrderProduct): Promise<OrderProduct> {
        const saved = await this.ormRepo.save(orderProduct);
        return saved;
    }
}

