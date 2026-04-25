import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { Expose } from 'class-transformer';
import { ProductData } from './product-data.entity';
import { ProductCategory } from './product-category.entity';
import type Team from '../../../../modules/users/infra/typeorm/entities/Team';

@Entity('pd100_products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;


  @OneToOne(() => ProductData, (product_data) => product_data.product, {
    eager: true,
  })
  product_data: ProductData;

  @OneToMany('Archive', 'referenceImage', {
    eager: true,
  })
  images: any[];

  @OneToMany('OrderProduct', 'product')
  orders_products: any[];



  @Column({ nullable: true, name: 'time_discount_id' })
  time_discount_id: string;

  @ManyToOne('TimeDiscount', 'products')
  @JoinColumn({ name: 'time_discount_id' })
  time_discount: any;

  @OneToMany('ProductAttribute', 'product', {
    eager: true,
  })
  attributes: any[];

  @Column({ nullable: true })
  categories?: string

  @Expose({ name: 'categories' })
  get categoriesParse() {
    return this.categories && JSON.parse(this.categories);
  }

  @Expose()
  categories_items: ProductCategory[] = []

  @Column()
  cod_product: string;

  @Column({ type: 'bigint', nullable: true })
  price: number;

  @Column({ type: 'bigint', nullable: true, name: 'old_price' })
  old_price: number;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true, name: 'short_description' })
  short_description: string;

  @Column({ nullable: true, name: 'mode_data' })
  mode_data: string;

  @Column({ default: 'product' })
  type: 'service' | 'product';

  @Column()
  slug: string;

  @Column({ nullable: true })
  emphasis: boolean;


  @Column({ nullable: true })
  visibility: string;

  @Column({ nullable: true })
  published: string;

  @Column({ nullable: true })
  time: string;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deleted_at: Date;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  constructor(props: Partial<Product>) {
    Object.assign(this, props);
    this.type = props?.type ?? 'product';
    this.emphasis = props?.emphasis ?? false;

    if (props?.price !== undefined) {
      this.price = Math.round(Number(props.price));
    }
    if (props?.old_price !== undefined) {
      this.old_price = Math.round(Number(props.old_price));
    }
  }

  public getId() {
    return this.id;
  }
  public getName() {
    return this.name;
  }
  public getPrice() {
    return this.price;
  }
  public getOldPrice() {
    return this.old_price;
  }

  @ManyToMany('Team', 'products')
  team: Team[]

  get image_primary() {
    if (!this.images || this.images.length === 0) return null;
    return this.images.find((img) => img.is_primary) || this.images[0];
  }

  public toJSON() {
    return {
      id: this.id,
      name: this.name,
      cod_product: this.cod_product,
      product_data: this.product_data?.toJSON
        ? this.product_data.toJSON()
        : this.product_data,
      price: this.price,
      old_price: this.old_price,
      description: this.description,
      short_description: this.short_description,
      mode_data: this.mode_data,
      type: this.type,
      slug: this.slug,
      emphasis: this.emphasis,
      categories: this.categories,
      visibility: this.visibility,
      published: this.published,
      team: this.team,
      time_discount_id: this.time_discount_id,
      time: this.time,
      categories_items: (this as any).categories_items,
      attributes: this.attributes,
      orders_products: this.orders_products,

      time_discount: this.time_discount,
      images: this.images?.map((img) => (img?.toJSON ? img.toJSON() : img)),
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }
}