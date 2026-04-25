import Orders from '@modules/orders/infra/typeorm/entities/Order'
import Professional from '@modules/users/infra/typeorm/entities/Professional'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm'

@Entity('sc100_schedulings')
class Schedule {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  date: Date

  @Column('uuid')
  professional_id: string

  @OneToOne(() => Professional, { eager: true })
  @JoinColumn({ name: 'professional_id' })
  professional: Professional

  @OneToOne(() => Orders, { eager: true, nullable: true })
  @JoinColumn({ name: 'order_id' })
  order: Orders

  @Column()
  name: string

  @Column()
  observations: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

export default Schedule
