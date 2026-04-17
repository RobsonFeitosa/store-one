import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProductData } from "../../../domain/entities/product-data.entity";
import { ProductDataRepository } from "../../../domain/repositories/product-data.repository";

@Injectable()
export class TypeOrmProductDataRepository implements ProductDataRepository {
    constructor(
        private readonly ormRepo: Repository<ProductData>
    ) { }


    async create(data: ProductData): Promise<ProductData> {
        const saved = await this.ormRepo.save(data);
        return saved;
    }

    async findByProductId(product_id: string): Promise<ProductData | null> {
        const entity = await this.ormRepo.findOneBy({ product_id });
        return entity;
    }

    async save(data: ProductData): Promise<ProductData> {
        const saved = await this.ormRepo.save(data);
        return saved;
    }
}

