import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm'

import type { User } from './User'
import { Tenant } from '../../../../tenant/domain/entities/tenant.entity'

@Entity('address')
class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  title: string

  @Column({ nullable: true })
  user_id?: string

  @ManyToOne('User', (user: any) => (user as any).addresses)
  @JoinColumn({ name: 'user_id' })
  user?: User

  @Column()
  zipcode: string

  @Column()
  city: string

  @Column()
  state: string

  @Column()
  country: string

  @Column()
  primary: boolean

  @Column()
  neighborhood: string

  @Column()
  street: string

  @Column()
  street_number: string

  @Column({ name: 'tenant_id', nullable: true })
  tenant_id: string

  @ManyToOne(() => Tenant)
  @JoinColumn({ name: 'tenant_id' })
  tenant: Tenant

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

export default Address
