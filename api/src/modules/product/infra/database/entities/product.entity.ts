import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn
} from 'typeorm';

@Entity('pd100_products')
export class ProductEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    cod_product: string;

    @Column({ type: 'bigint', nullable: true })
    price: number;

    @Column({ type: 'bigint', nullable: true, name: 'old_price' })
    oldPrice: number;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true, name: 'short_description' })
    shortDescription: string;

    @Column({ nullable: true, name: 'mode_data' })
    modeData: string;

    @Column({ default: 'product' })
    type: 'service' | 'product';

    @Column()
    slug: string;

    @Column({ nullable: true })
    emphasis: boolean;

    @Column({ nullable: true })
    categories: string;

    @Column({ nullable: true })
    visibility: string;

    @Column({ nullable: true })
    published: string;

    @Column({ nullable: true, name: 'time_discount_id' })
    timeDiscountId: string;

    @Column({ nullable: true })
    time: string;

    @DeleteDateColumn({ name: 'deleted_at', nullable: true })
    deletedAt: Date;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
