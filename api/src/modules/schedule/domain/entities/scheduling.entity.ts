import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm'
import { Professional } from 'src/modules/users/infra/typeorm/entities/Professional'
import { Order } from 'src/modules/order/domain/entities/order.entity'

@Entity('sc100_schedulings')
export class Scheduling {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  date: Date

  @Column('uuid')
  professional_id: string

  @ManyToOne(() => Professional, { eager: true })
  @JoinColumn({ name: 'professional_id' })
  professional: Professional

  @Column('uuid', { nullable: true })
  order_id: string

  @OneToOne(() => Order, { eager: true, nullable: true })
  @JoinColumn({ name: 'order_id' })
  order: Order

  @Column('uuid', { nullable: true })
  product_id: string

  @ManyToOne('Product', { eager: true, nullable: true })
  @JoinColumn({ name: 'product_id' })
  product: any

  @Column()
  name: string

  @Column()
  observations: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  constructor(props: Partial<Scheduling>) {
    Object.assign(this, props)
  }
}
