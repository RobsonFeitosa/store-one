import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm'
import type Team from './Team'
import type { User } from './User'
import type { TimeIntervals } from './TimeIntervals'
import { Tenant } from '../../../../tenant/domain/entities/tenant.entity'

@Entity('pr100_professional')
export class Professional {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  user_id?: string

  @OneToOne('User', (user: any) => user.professional, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user?: User

  @Column({ nullable: true })
  team_id?: string | null

  @ManyToOne('Team', (team: any) => team.professional, {
    eager: true,
  })
  @JoinColumn({ name: 'team_id' })
  team?: Team

  @OneToMany('TimeIntervals', (timeInterval: any) => timeInterval.professional, {
    eager: true,
  })
  timeIntervals?: TimeIntervals[]

  @Column({ name: 'tenant_id', nullable: true })
  tenant_id: string

  @ManyToOne(() => Tenant)
  @JoinColumn({ name: 'tenant_id' })
  tenant: Tenant

  @Column()
  function: string

  @Column()
  name: string

  @Column({ nullable: true })
  invite?: string

  @Column()
  actived: boolean

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

