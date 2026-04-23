import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductAttribute } from "../../../domain/entities/product-attribute.entity";
import { ProductAttributeRepository } from "../../../domain/repositories/product-attribute.repository";

@Injectable()
export class TypeOrmProductAttributeRepository implements ProductAttributeRepository {
    constructor(
        @InjectRepository(ProductAttribute)
        private readonly ormRepo: Repository<ProductAttribute>
    ) { }

    async create(data: Partial<ProductAttribute>): Promise<ProductAttribute> {
        const attribute = this.ormRepo.create(data);
        return this.ormRepo.save(attribute);
    }

    async findById(id: string): Promise<ProductAttribute | null> {
        return this.ormRepo.findOne({
            where: { id },
            relations: ['variations']
        });
    }

    async findAllByProduct(product_id: string): Promise<ProductAttribute[]> {
        return this.ormRepo.find({
            where: { product_id },
            relations: ['variations']
        });
    }

    async save(attribute: ProductAttribute): Promise<ProductAttribute> {
        return this.ormRepo.save(attribute);
    }

    async delete(id: string): Promise<void> {
        await this.ormRepo.delete(id);
    }
}
