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
import { UserEntity } from 'src/modules/user/infra/database/entities/user.entity';

@Entity('or100_orders')
export class OrderEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('uuid', { name: 'user_id' })
    userId: string;

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;

    @Column({ name: 'cod_order' })
    codOrder: string;

    @Column({ name: 'professional_name', nullable: true })
    professionalName: string;

    @Column({ name: 'coupon_applied', nullable: true })
    couponApplied: string;

    @Column({ nullable: true })
    freight: string;

    @Column({ name: 'payment_method', nullable: true })
    paymentMethod: string;

    @Column({ type: 'bigint' })
    amount: number;

    @Column({ name: 'type_product', nullable: true })
    typeProduct: string;

    @Column({ name: 'tracking_code', nullable: true })
    trackingCode: string;

    @OneToMany('OrderStatusEntity', 'order', { cascade: true })
    status: any[];

    @OneToMany('OrderProductEntity', 'order', { cascade: true })
    orderProducts: any[];

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
