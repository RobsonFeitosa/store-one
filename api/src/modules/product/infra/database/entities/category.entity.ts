import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pd101_product_categories')
export class CategoryEntity {
    @PrimaryGeneratedColumn('increment')
    id: string;

    @Column({ name: 'parent_id', nullable: true })
    parentId: string;

    @Column()
    name: string;

    @Column()
    type: string;

    @Column()
    level: number;
}
