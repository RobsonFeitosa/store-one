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
import { Exclude, Expose } from 'class-transformer';

@Entity('pd106_products_variations')
export class ProductVariation {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'product_attribute_id' })
    product_attribute_id: string;

    @ManyToOne('ProductAttribute', 'variations')
    @JoinColumn({ name: 'product_attribute_id' })
    product_attribute: any;

    @Column({ type: 'bigint' })
    price: number;

    @Column()
    name: string;

    @Column({ type: 'int', nullable: true })
    quantity: number;

    @Column({ nullable: true })
    time: string;

    @Column({ default: true })
    active: boolean;

    @Column({ type: 'bigint', nullable: true })
    weight: number;

    @Column({ nullable: true })
    @Exclude()
    dimensions: string;

    @Expose({ name: 'dimensions' })
    get dimensionsParse() {
        return this.dimensions && JSON.parse(this.dimensions);
    }

    @OneToOne('Archive', 'referenceImage', {
        eager: true,
    })
    @JoinColumn({ name: 'image_id' })
    image: any;

    @Column({ name: 'image_id', nullable: true })
    image_id: string;

    @Column({ nullable: true })
    sku: string;

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updated_at: Date;

    constructor(props: Partial<ProductVariation>) {
        Object.assign(this, props);
        if (props?.price !== undefined) {
            this.price = Math.round(Number(props.price));
        }
    }

    public toJSON() {
        return {
            id: this.id,
            product_attribute_id: this.product_attribute_id,
            price: this.price,
            name: this.name,
            quantity: this.quantity,
            time: this.time,
            active: this.active,
            weight: this.weight,
            dimensions: this.dimensionsParse,
            image: this.image?.toJSON ? this.image.toJSON() : this.image,
            sku: this.sku,
            created_at: this.created_at,
            updated_at: this.updated_at,
        };
    }
}
