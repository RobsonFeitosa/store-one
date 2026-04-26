import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm'

import { Exclude } from 'class-transformer'
import type { UserSettings } from './UserSettings'
import { Tenant } from '../../../../tenant/domain/entities/tenant.entity'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  @Exclude()
  password: string

  @Column({ default: 'customer' })
  role: string

  @Column()
  @Exclude()
  settings_id: string

  @OneToOne('UserSettings', (settings: any) => settings.user, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'settings_id' })
  settings: UserSettings

  @OneToMany('Address', (address: any) => address.user)
  addresses: any[]

  @Column({ name: 'tenant_id', nullable: true })
  tenant_id: string

  @ManyToOne(() => Tenant)
  @JoinColumn({ name: 'tenant_id' })
  tenant: Tenant
}
