import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('pd101_product_categories')
export class ProductCategory {
    @PrimaryGeneratedColumn('increment')
    id: string;

    @Column({ nullable: true })
    parent_id: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    type: string;

    @Column({ nullable: true })
    level: number;

    @Column({ nullable: true })
    slug: string;

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updated_at: Date;

    constructor(props: Partial<ProductCategory>) {
        Object.assign(this, props);
    }

    public toJSON() {
        return {
            id: this.id,
            parent_id: this.parent_id,
            name: this.name,
            type: this.type,
            level: this.level,
            created_at: this.created_at,
            updated_at: this.updated_at,
        };
    }
}
