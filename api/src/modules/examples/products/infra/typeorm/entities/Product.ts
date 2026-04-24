import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
  DeleteDateColumn,
  JoinColumn,
  ManyToOne,
  ManyToMany,
} from 'typeorm'

import type ProductWish from './ProductWish'
import type ProductData from './ProductData'
import type ProductAttributes from './ProductAttributes'
import { Expose } from 'class-transformer'
import type { Archive } from '@modules/archive/domain/entities/archive.entity'
import type TimeDiscount from './TimeDiscount'
import type Team from '@modules/users/infra/typeorm/entities/Team'
import type Categories from './ProductCategory'
import type Orders from '@modules/orders/infra/typeorm/entities/Order'
import type OrderProduct from '@modules/orders/infra/typeorm/entities/OrderProduct'

@Entity('pd100_products')
class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  cod_product: string

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  price?: number

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  old_price?: number

  @Column({ nullable: true })
  description?: string

  @Column({ nullable: true })
  short_description?: string

  @Column({ nullable: true })
  mode_data?: string

  @Column({ default: 'product' })
  type: 'service' | 'product'

  @Column()
  slug: string

  @Column({ nullable: true })
  emphasis?: boolean

  @Column({ nullable: true })
  categories?: string

  @Column({ nullable: true })
  visibility: string

  @Column({ nullable: true })
  published: string

  @Expose({ name: 'categories' })
  get categoriesParse() {
    return this.categories && JSON.parse(this.categories)
  }

  @Expose()
  categories_items: Categories[]

  @OneToMany('OrderProduct', (order_product: OrderProduct) => order_product.product)
  orders_products: OrderProduct[]

  @OneToOne('ProductWish', (wish: ProductWish) => wish.product, {
    nullable: true,
  })
  wish: ProductWish | null

  @OneToOne('ProductData', (product_data: ProductData) => product_data.product, {
    eager: true,
  })
  product_data: ProductData

  @Column({ nullable: true })
  time_discount_id?: string | null

  @ManyToOne('TimeDiscount', (time_discount: TimeDiscount) => time_discount.products)
  @JoinColumn({ name: 'time_discount_id' })
  time_discount: TimeDiscount | null

  @OneToMany('ProductAttributes', (product_data: ProductAttributes) => product_data.product, {
    eager: true,
  })
  attributes: ProductAttributes[]

  @OneToMany('Archive', (archive: Archive) => archive.referenceImage, {
    eager: true,
  })
  images: Archive[]

  @Column({ nullable: true })
  time?: string

  @ManyToMany('Team', (team: Team) => team.products)
  team: Team[]

  @DeleteDateColumn({ nullable: true })
  deleted_at: Date

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date
}

export default Product
