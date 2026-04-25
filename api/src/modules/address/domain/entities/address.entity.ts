import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import { User } from 'src/modules/user/domain/entities/user.entity'

@Entity('address')
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  title: string

  @Column()
  user_id: string

  @ManyToOne(() => User, (user) => user.addresses)
  @JoinColumn({ name: 'user_id' })
  user: User

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

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  constructor(props: Partial<Address>) {
    Object.assign(this, props)
  }
}
