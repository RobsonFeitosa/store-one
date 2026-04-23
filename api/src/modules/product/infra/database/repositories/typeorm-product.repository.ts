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
    const { page = 1, limit = 10, search } = options;
    const skip = (page - 1) * limit;

    const query = this.ormRepo
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.product_data', 'product_data')
      .leftJoinAndMapMany(
        'product.images',
        Archive,
        'images',
        'images.reference_id = product.id AND images.origin_target = :target',
        { target: 'product' },
      )
      .take(limit)
      .skip(skip)
      .orderBy('product.created_at', 'DESC');

    if (search) {
      query.where(
        'product.name ILIKE :search OR product.cod_product ILIKE :search',
        { search: `%${search}%` },
      );
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
