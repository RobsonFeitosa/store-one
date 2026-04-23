import { Injectable } from '@nestjs/common';

import { ILike, Repository } from 'typeorm';
import { Product } from '../../../domain/entities/product.entity';
import { Archive } from '../../../../archive/domain/entities/archive.entity';
import type {
  ProductRepository,
  FindAllOptions,
} from '../../../domain/repositories/product.repository';

const relations = [
  'images',
  'wish',
  'product_data',
  'attributes',
  'time_discount',
  'team',
]

@Injectable()
export class TypeOrmProductRepository implements ProductRepository {
  constructor(private readonly ormRepo: Repository<Product>) { }

  async create(product: Product): Promise<Product> {
    const saved = await this.ormRepo.save(product);
    return saved;
  }

  async findById(id: string): Promise<Product | null> {
    const product = await this.ormRepo.findOne({
      where: {
        id,
      },
      relations,
      order: {
        updated_at: 'DESC',
        created_at: 'DESC',
      },
      withDeleted: true,
    })
    return product
  }

  async findByName(name: string): Promise<Product | null> {
    return this.ormRepo
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.product_data', 'product_data')
      .leftJoinAndMapMany(
        'product.images',
        Archive,
        'images',
        'images.reference_id = product.id AND images.origin_target = :target',
        { target: 'product' },
      )
      .where('product.name = :name', { name })
      .getOne();
  }

  async findByCode(code: string): Promise<Product | null> {
    return this.ormRepo
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.product_data', 'product_data')
      .leftJoinAndMapMany(
        'product.images',
        Archive,
        'images',
        'images.reference_id = product.id AND images.origin_target = :target',
        { target: 'product' },
      )
      .where('product.cod_product = :code', { code })
      .getOne();
  }

  async findAll(options: FindAllOptions): Promise<[Product[], number]> {
    const {
      page = 1,
      limit = 10,
      search,
      onlyDiscount,
      type,
      timeDiscountPriory,
      name,
      quantity,
      weight,
      priceMin,
      priceMax,
      lowPrice,
      color,
      size,
      highPrice,
      old,
      alphabeticalASC,
      alphabeticalDESC,
      categoryId,
      productIds,
    } = options;
    const skip = (page - 1) * limit;

    const query = this.ormRepo
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.product_data', 'product_data')
      .leftJoinAndSelect('product.time_discount', 'time_discount')
      .leftJoinAndMapMany(
        'product.images',
        Archive,
        'images',
        'images.reference_id = product.id AND images.origin_target = :target',
        { target: 'product' },
      )
      .take(limit)
      .skip(skip);

    if (search) {
      query.andWhere(
        '(product.name ILIKE :search OR product.cod_product ILIKE :search)',
        { search: `%${search}%` },
      );
    }

    if (name) {
      query.andWhere('product.name ILIKE :name', { name: `%${name}%` });
    }

    if (onlyDiscount) {
      query.andWhere('(product.time_discount_id IS NOT NULL OR product.old_price > product.price)');
    }

    if (type) {
      query.andWhere('product.type = :type', { type });
    }

    if (quantity !== undefined) {
      query.andWhere('product_data.quantity >= :quantity', { quantity });
    }

    if (weight !== undefined) {
      query.andWhere('product_data.weight = :weight', { weight });
    }

    if (priceMin !== undefined) {
      query.andWhere('product.price >= :priceMin', { priceMin });
    }

    if (priceMax !== undefined) {
      query.andWhere('product.price <= :priceMax', { priceMax });
    }

    if (categoryId) {
      query.andWhere('product.categories LIKE :categoryId', {
        categoryId: `%${categoryId}%`,
      });
    }

    if (productIds) {
      let ids: string[] = [];
      try {
        const parsed = JSON.parse(productIds);
        ids = Array.isArray(parsed) ? parsed : [String(productIds)];
      } catch (e) {
        ids = String(productIds).split(',').filter(id => id.trim().length > 0);
      }

      if (ids.length > 0) {
        query.andWhere('product.id IN (:...ids)', { ids });
      }
    }

    if (color || size) {
      query
        .leftJoin('product.attributes', 'attributes')
        .leftJoin('attributes.variations', 'variations');

      if (color) {
        query.andWhere('variations.name ILIKE :color', { color: `%${color}%` });
      }
      if (size) {
        query.andWhere('variations.name ILIKE :size', { size: `%${size}%` });
      }
    }

    if (timeDiscountPriory) {
      query.addOrderBy(
        'product.time_discount_id',
        'ASC',
        'NULLS LAST',
      );
    }

    if (lowPrice) {
      query.addOrderBy('product.price', 'ASC');
    } else if (highPrice) {
      query.addOrderBy('product.price', 'DESC');
    } else if (alphabeticalASC) {
      query.addOrderBy('product.name', 'ASC');
    } else if (alphabeticalDESC) {
      query.addOrderBy('product.name', 'DESC');
    } else if (old) {
      query.addOrderBy('product.created_at', 'ASC');
    } else {
      query.addOrderBy('product.created_at', 'DESC');
    }

    return query.getManyAndCount();
  }

  async delete(id: string): Promise<void> {
    await this.ormRepo.delete(id);
  }

  async save(product: Product): Promise<Product> {
    return this.ormRepo.save(product);
  }
}
