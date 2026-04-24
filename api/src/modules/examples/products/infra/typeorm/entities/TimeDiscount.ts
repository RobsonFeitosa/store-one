import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm'
import Product from './Product'

@Entity('ti100_time_discount')
class TimeDiscount {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  startDate: Date

  @Column()
  endDate: Date

  @Column({ nullable: true })
  discount: number

  @Column()
  status: string

  @OneToMany(() => Product, (product) => product.time_discount, {
    eager: true,
  })
  products: Product[]

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

export default TimeDiscount
