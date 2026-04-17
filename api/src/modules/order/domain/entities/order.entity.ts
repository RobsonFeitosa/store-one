import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
    Column,
    OneToMany,
    ManyToOne
} from 'typeorm';
import { User } from 'src/modules/user/domain/entities/user.entity';
import { OrderStatus } from './order-status.entity';
import { OrderProduct } from './order-product.entity';

@Entity('or100_orders')
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('uuid', { name: 'user_id' })
    user_id: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column({ name: 'cod_order' })
    cod_order: string;

    @Column({ name: 'professional_name', nullable: true })
    professional_name: string;

    @Column({ name: 'coupon_applied', nullable: true })
    coupon_applied: string;

    @Column({ nullable: true })
    freight: string;

    @Column({ name: 'payment_method', nullable: true })
    payment_method: string;

    @Column({ type: 'bigint' })
    amount: number;

    @Column({ name: 'type_product', nullable: true })
    type_product: string;

    @Column({ name: 'tracking_code', nullable: true })
    tracking_code: string;

    @OneToMany('OrderStatus', 'order', { cascade: true })
    status: any[];

    @OneToMany('OrderProduct', 'order', { cascade: true })
    orderProducts: any[];


    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updated_at: Date;

    constructor(props: Partial<Order>) {
        Object.assign(this, props);
        if (props?.amount !== undefined) {
            this.amount = Math.round(Number(props.amount));
        }
    }

    public toJSON() {
        return {
            id: this.id,
            user_id: this.user_id,
            cod_order: this.cod_order,
            professional_name: this.professional_name,
            coupon_applied: this.coupon_applied,
            freight: this.freight,
            payment_method: this.payment_method,
            amount: this.amount,
            type_product: this.type_product,
            tracking_code: this.tracking_code,
            status: this.status,
            orderProducts: this.orderProducts,
            created_at: this.created_at,
            updated_at: this.updated_at,
        };
    }
}

