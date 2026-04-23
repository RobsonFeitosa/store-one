import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    OneToMany,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';

@Entity('pd105_products_attributes')
export class ProductAttribute {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    product_id: string;

    @ManyToOne('Product', 'attributes')
    @JoinColumn({ name: 'product_id' })
    product: any;

    @Column()
    name: string;

    @Column()
    @Exclude()
    options: string;

    @Expose({ name: 'options' })
    get optionsParse() {
        return this.options && JSON.parse(this.options);
    }

    @OneToMany('ProductVariation', 'product_attribute', {
        eager: true,
    })
    variations: any[];

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updated_at: Date;

    constructor(props: Partial<ProductAttribute>) {
        Object.assign(this, props);
    }

    public toJSON() {
        return {
            id: this.id,
            product_id: this.product_id,
            name: this.name,
            options: this.optionsParse,
            variations: this.variations,
            created_at: this.created_at,
            updated_at: this.updated_at,
        };
    }
}
