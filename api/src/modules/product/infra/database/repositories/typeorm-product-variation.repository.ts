import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductVariation } from "../../../domain/entities/product-variation.entity";
import { ProductVariationRepository } from "../../../domain/repositories/product-variation.repository";

@Injectable()
export class TypeOrmProductVariationRepository implements ProductVariationRepository {
    constructor(
        @InjectRepository(ProductVariation)
        private readonly ormRepo: Repository<ProductVariation>
    ) { }

    async create(data: Partial<ProductVariation>): Promise<ProductVariation> {
        const variation = this.ormRepo.create(data);
        return this.ormRepo.save(variation);
    }

    async findById(id: string): Promise<ProductVariation | null> {
        return this.ormRepo.findOne({
            where: { id },
            relations: ['image']
        });
    }

    async findAllByAttribute(product_attribute_id: string): Promise<ProductVariation[]> {
        return this.ormRepo.find({
            where: { product_attribute_id },
            relations: ['image']
        });
    }

    async save(variation: ProductVariation): Promise<ProductVariation> {
        return this.ormRepo.save(variation);
    }

    async delete(id: string): Promise<void> {
        await this.ormRepo.delete(id);
    }
}
