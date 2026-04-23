import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';

@Entity('pd104_products_data')
export class ProductData {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'product_id' })
    product_id: string;

    @OneToOne('Product', 'product_data')
    @JoinColumn({ name: 'product_id' })
    product: any;



    @Column({ type: 'int', nullable: true })
    quantity: number;

    @Column({ nullable: true })
    sku: string;

    @Column({ type: 'decimal', nullable: true })
    weight: number;

    @Column({ nullable: true })
    @Exclude()
    dimensions: string;

    @Expose({ name: 'dimensions' })
    get dimensionsParse() {
        return this.dimensions && JSON.parse(this.dimensions);
    }

    @Column({ name: 'code_bar', nullable: true })
    code_bar: string;

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updated_at: Date;

    constructor(props: Partial<ProductData>) {
        Object.assign(this, props);
    }

    public toJSON() {
        return {
            id: this.id,
            product_id: this.product_id,
            quantity: this.quantity,
            sku: this.sku,
            weight: this.weight,
            dimensions: this.dimensions,
            code_bar: this.code_bar,
            created_at: this.created_at,
            updated_at: this.updated_at,
        };
    }
}

