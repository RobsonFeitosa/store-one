import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'

import { Exclude } from 'class-transformer'
import type { UserSettings } from './UserSettings'
import UserTransactions from './UserTransactions'
import type { User } from './User'

@Entity('comments')
class UserComments {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  @Exclude()
  user_id: string

  @ManyToOne('User', (user: any) => (user as any).comments)
  @JoinColumn({ name: 'user_id' })
  user: User

  @Column()
  comment: string

  @Column()
  type: string

  @Column()
  note: number

  @Column()
  is_public: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

export default UserComments
