import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm'

import uploadConfig from '../../../../../config/upload'

import { Exclude, Expose } from 'class-transformer'
import type { User } from './User'

@Entity('users_settings')
export class UserSettings {
  @PrimaryGeneratedColumn('uuid')
  @Exclude()
  id: string

  @Column({ nullable: true })
  avatar: string

  @Column()
  level: 1 | 2

  @Column({ nullable: true })
  @Exclude()
  cpf: string

  @Column()
  actived: boolean

  @Column({ nullable: true })
  @Exclude()
  phone_number: string

  @OneToOne('User', (user: any) => user.settings)
  user: User

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    if (!this.avatar) {
      return null
    }

    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.avatar}`
      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.avatar}`
      default:
        return null
    }
  }
}

