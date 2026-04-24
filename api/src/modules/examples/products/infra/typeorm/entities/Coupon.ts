import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity('cp100_coupon')
class Coupon {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  code_coupon: string

  @Column()
  status: string

  @Column()
  discount: number

  @Column()
  validation: Date

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date
}

export default Coupon
