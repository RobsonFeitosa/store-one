import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    OneToOne,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('pd102_product_wish')
export class ProductWish {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'product_id' })
    @Exclude()
    product_id: string;

    @OneToOne('Product', 'wish')
    @JoinColumn({ name: 'product_id' })
    product: any;

    @Column({ name: 'user_id' })
    @Exclude()
    user_id: string;

    @ManyToOne('User', 'wishes')
    @JoinColumn({ name: 'user_id' })
    user: any;

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updated_at: Date;

    constructor(props: Partial<ProductWish>) {
        Object.assign(this, props);
    }

    public toJSON() {
        return {
            id: this.id,
            product_id: this.product_id,
            user_id: this.user_id,
            created_at: this.created_at,
            updated_at: this.updated_at,
        };
    }
}
