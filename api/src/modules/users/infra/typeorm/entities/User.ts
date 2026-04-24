import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm'

import { Exclude } from 'class-transformer'
import type { UserSettings } from './UserSettings'

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

  @Column()
  @Exclude()
  settings_id: string

  @OneToOne('UserSettings', (settings: any) => settings.user, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'settings_id' })
  settings: UserSettings

  // @OneToMany(() => UserComments, (comment) => comment.user)
  // comment: UserComments[]


}
