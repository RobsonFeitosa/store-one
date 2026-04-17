import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne,
    JoinColumn,
    OneToOne
} from 'typeorm';
import { Category } from './category.entity';
import { ProductData } from './product-data.entity';

@Entity('pd100_products')
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ name: 'category_id', nullable: true })
    category_id: number;

    @ManyToOne('Category')
    @JoinColumn({ name: 'category_id' })
    category: any;

    @OneToOne('ProductData', 'product')
    product_data: any;


    @Column()
    cod_product: string;


    @Column({ type: 'bigint', nullable: true })
    price: number;

    @Column({ type: 'bigint', nullable: true, name: 'old_price' })
    old_price: number;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true, name: 'short_description' })
    short_description: string;

    @Column({ nullable: true, name: 'mode_data' })
    mode_data: string;

    @Column({ default: 'product' })
    type: 'service' | 'product';

    @Column()
    slug: string;

    @Column({ nullable: true })
    emphasis: boolean;

    @Column({ nullable: true })
    categories: string;

    @Column({ nullable: true })
    visibility: string;

    @Column({ nullable: true })
    published: string;

    @Column({ nullable: true, name: 'time_discount_id' })
    time_discount_id: string;

    @Column({ nullable: true })
    time: string;

    @DeleteDateColumn({ name: 'deleted_at', nullable: true })
    deleted_at: Date;

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updated_at: Date;

    constructor(props: Partial<Product>) {
        Object.assign(this, props);
        this.type = props?.type ?? 'product';
        this.emphasis = props?.emphasis ?? false;
        
        if (props?.price !== undefined) {
            this.price = Math.round(Number(props.price));
        }
        if (props?.old_price !== undefined) {
            this.old_price = Math.round(Number(props.old_price));
        }
    }

    public getId() { return this.id; }
    public getName() { return this.name; }
    public getPrice() { return this.price; }
    public getOldPrice() { return this.old_price; }

    public toJSON() {
        return {
            id: this.id,
            name: this.name,
            cod_product: this.cod_product,
            category_id: this.category_id,
            category: this.category,
            product_data: this.product_data,
            price: this.price,
            old_price: this.old_price,
            description: this.description,
            short_description: this.short_description,
            mode_data: this.mode_data,
            type: this.type,
            slug: this.slug,
            emphasis: this.emphasis,
            categories: this.categories,
            visibility: this.visibility,
            published: this.published,
            time_discount_id: this.time_discount_id,
            time: this.time,
            created_at: this.created_at,
            updated_at: this.updated_at,
        };
    }

}

