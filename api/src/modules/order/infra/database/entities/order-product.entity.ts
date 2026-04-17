import {
    Entity,
    JoinColumn,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne
} from 'typeorm';
import { ProductEntity } from 'src/modules/product/infra/database/entities/product.entity';

@Entity('or100_pr100_order_product')
export class OrderProductEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'product_id' })
    productId: string;

    @ManyToOne(() => ProductEntity)
    @JoinColumn({ name: 'product_id' })
    product: ProductEntity;

    @Column({ name: 'order_id' })
    orderId: string;

    @ManyToOne('OrderEntity', 'orderProducts')
    @JoinColumn({ name: 'order_id' })
    order: any;

    @Column({ type: 'int' })
    quantity: number;
}
