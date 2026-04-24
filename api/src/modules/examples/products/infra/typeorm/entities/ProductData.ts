import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm'
import Product from './Product'
import { Exclude, Expose } from 'class-transformer'

@Entity('pd104_products_data')
class ProductData {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  product_id: string

  @OneToOne(() => Product, { cascade: true })
  @JoinColumn({ name: 'product_id' })
  product: Product

  @Column('int', { nullable: true })
  quantity: number

  @Column({ nullable: true })
  sku: string

  @Column({ nullable: true })
  weight: number

  @Column({ nullable: true })
  @Exclude()
  dimensions: string

  @Expose({ name: 'dimensions' })
  get optionsParse() {
    return JSON.parse(this.dimensions)
  }

  @Column({ nullable: true })
  code_bar: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

export default ProductData
