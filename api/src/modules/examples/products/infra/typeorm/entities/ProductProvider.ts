import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm'
import type { Archive } from '@modules/archive/domain/entities/archive.entity'

@Entity('pd107_products_provider')
class ProductProvider {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column({ nullable: true })
  phone1: string

  @Column({ nullable: true })
  phone2: string

  @Column({ nullable: true })
  email: string

  @Column({ nullable: true })
  address: string

  @OneToOne('Archive', (archive: Archive) => archive.referenceImage, {
    eager: true,
  })
  image: Archive

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

export default ProductProvider
