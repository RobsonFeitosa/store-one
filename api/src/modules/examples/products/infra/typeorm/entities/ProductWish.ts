import type User from '@modules/users/infra/typeorm/entities/User'
import { Exclude } from 'class-transformer'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm'
import type Product from './Product'

@Entity('pd102_product_wish')
class ProductWish {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  @Exclude()
  product_id: string

  @OneToOne('Product')
  @JoinColumn({ name: 'product_id' })
  product: Product

  @Column()
  @Exclude()
  user_id: string

  @ManyToOne('User', (user: User) => user.wishes)
  @JoinColumn({ name: 'user_id' })
  user: User

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

export default ProductWish
