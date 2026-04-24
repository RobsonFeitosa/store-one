import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm'
import ProductVariations from './ProductVariations'
import Product from './Product'
import { Exclude, Expose } from 'class-transformer'

@Entity('pd105_products_attributes')
class ProductAttributes {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  product_id: string

  @OneToOne(() => Product, { cascade: true })
  @JoinColumn({ name: 'product_id' })
  product: Product

  @Column()
  name: string

  @Column()
  @Exclude()
  options: string

  @Expose({ name: 'options' })
  get optionsParse() {
    return JSON.parse(this.options)
  }

  @OneToMany(
    () => ProductVariations,
    (productsVariations) => productsVariations.product_attr,
    {
      eager: true,
    },
  )
  variations: ProductVariations[]

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

export default ProductAttributes
