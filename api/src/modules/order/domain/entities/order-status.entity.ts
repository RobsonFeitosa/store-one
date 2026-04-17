import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
    Column,
    ManyToOne
} from 'typeorm';
import { Order } from './order.entity';

@Entity('or102_orders_status')
export class OrderStatus {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'order_id' })
    order_id: string;

    @ManyToOne('Order', 'status')
    @JoinColumn({ name: 'order_id' })
    order: any;



    @Column()
    name: string;

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updated_at: Date;

    constructor(props: Partial<OrderStatus>) {
        Object.assign(this, props);
    }

    public toJSON() {
        return {
            id: this.id,
            order_id: this.order_id,
            name: this.name,
            created_at: this.created_at,
            updated_at: this.updated_at,
        };
    }
}

