import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductWish } from "../../../domain/entities/product-wish.entity";
import { ProductWishRepository } from "../../../domain/repositories/product-wish.repository";
import PaginationOptionsDTO from 'src/shared/domain/helpers/dtos/pagination-opions.dto';

@Injectable()
export class TypeOrmProductWishRepository implements ProductWishRepository {
    constructor(
        @InjectRepository(ProductWish)
        private readonly ormRepo: Repository<ProductWish>
    ) { }

    async create(data: { product_id: string, user_id: string }): Promise<ProductWish> {
        const wish = this.ormRepo.create(data);
        return this.ormRepo.save(wish);
    }

    async findByProductAndUser(product_id: string, user_id: string): Promise<ProductWish | null> {
        return this.ormRepo.findOneBy({ product_id, user_id });
    }

    async findAndCount(options: PaginationOptionsDTO, user_id: string): Promise<[ProductWish[], number]> {
        return this.ormRepo.findAndCount({
            where: { user_id },
            take: options.limit,
            skip: (options.page - 1) * options.limit,
            relations: ['product', 'product.images']
        });
    }

    async delete(id: string): Promise<void> {
        await this.ormRepo.delete(id);
    }
}
