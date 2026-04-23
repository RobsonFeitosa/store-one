import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm'
import type { Professional } from './Professional'
import { Product } from 'src/modules/product/domain/entities/product.entity'

@Entity('te100_team')
class Team {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  user_id: string

  @Column()
  operation: string

  @Column()
  name: string

  @OneToMany('Professional', (professional: any) => professional.team)
  professional: Professional[]

  @ManyToMany(() => Product, (product) => product.team, {
    cascade: true,
    eager: true,
  })
  @JoinTable({
    name: 'te100_pd100_team_product',
    joinColumn: {
      name: 'team_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'product_id',
      referencedColumnName: 'id',
    },
  })
  products: Product[]

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

export default Team
