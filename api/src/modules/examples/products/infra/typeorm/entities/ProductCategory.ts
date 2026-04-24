import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('pd101_product_categories')
class Categories {
  @PrimaryGeneratedColumn('increment')
  id: string

  @Column({ nullable: true })
  parent_id: string

  @Column()
  name: string

  @Column()
  type: string

  @Column()
  level: number
}

export default Categories
