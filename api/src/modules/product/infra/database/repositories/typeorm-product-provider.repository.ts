import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductProvider } from "../../../domain/entities/product-provider.entity";
import { ProductProviderRepository } from "../../../domain/repositories/product-provider.repository";

@Injectable()
export class TypeOrmProductProviderRepository implements ProductProviderRepository {
    constructor(
        @InjectRepository(ProductProvider)
        private readonly ormRepo: Repository<ProductProvider>
    ) { }

    async create(data: Partial<ProductProvider>): Promise<ProductProvider> {
        const provider = this.ormRepo.create(data);
        return this.ormRepo.save(provider);
    }

    async findById(id: string): Promise<ProductProvider | null> {
        return this.ormRepo.findOneBy({ id } as any);
    }

    async findAll(): Promise<ProductProvider[]> {
        return this.ormRepo.find();
    }

    async save(provider: ProductProvider): Promise<ProductProvider> {
        return this.ormRepo.save(provider);
    }

    async delete(id: string): Promise<void> {
        await this.ormRepo.delete(id);
    }
}
