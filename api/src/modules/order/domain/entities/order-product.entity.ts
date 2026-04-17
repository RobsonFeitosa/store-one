import {
    Entity,
    JoinColumn,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne
} from 'typeorm';
import { Product } from 'src/modules/product/domain/entities/product.entity';
import { Order } from './order.entity';

@Entity('or100_pr100_order_product')
export class OrderProduct {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'product_id' })
    product_id: string;

    @ManyToOne(() => Product)
    @JoinColumn({ name: 'product_id' })
    product: Product;

    @Column({ name: 'order_id' })
    order_id: string;

    @ManyToOne('Order', 'orderProducts')
    @JoinColumn({ name: 'order_id' })
    order: any;



    @Column({ type: 'int' })
    quantity: number;

    constructor(props: Partial<OrderProduct>) {
        Object.assign(this, props);
    }

    public toJSON() {
        return {
            id: this.id,
            order_id: this.order_id,
            product_id: this.product_id,
            quantity: this.quantity,
        };
    }
}

