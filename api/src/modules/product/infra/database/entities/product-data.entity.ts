import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn
} from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity('pd104_products_data')
export class ProductDataEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'product_id' })
    productId: string;

    @OneToOne(() => ProductEntity)
    @JoinColumn({ name: 'product_id' })
    product: ProductEntity;

    @Column({ type: 'int', nullable: true })
    quantity: number;

    @Column({ nullable: true })
    sku: string;

    @Column({ type: 'decimal', nullable: true })
    weight: number;

    @Column({ nullable: true })
    dimensions: string;

    @Column({ name: 'code_bar', nullable: true })
    codeBar: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
