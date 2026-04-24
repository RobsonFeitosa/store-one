import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm'
import type Product from './Product'
import { Exclude, Expose } from 'class-transformer'

import type { Archive } from '@modules/archive/domain/entities/archive.entity'

@Entity('pd106_products_variations')
class ProductVariations {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  product_attr_id: string

  @OneToOne('Product', { cascade: true })
  @JoinColumn({ name: 'product_attr_id' })
  product_attr: Product

  @Column()
  price: number

  @Column()
  name: string

  @Column({ nullable: true })
  quantity: number

  @Column({ nullable: true })
  time?: string

  @Column()
  actived: boolean

  @Column({ nullable: true })
  weight?: number

  @Exclude()
  @Column({ nullable: true })
  dimensions?: string

  @Expose({ name: 'dimensions' })
  get dimensionsParse() {
    return this.dimensions && JSON.parse(this.dimensions ?? {})
  }

  @OneToOne('Archive', (archive: Archive) => archive.referenceImage, {
    eager: true,
  })
  image?: Archive

  @Column({ nullable: true })
  sku: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

export default ProductVariations
