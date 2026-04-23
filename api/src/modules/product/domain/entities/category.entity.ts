import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('pd101_product_categories')
export class Category {
    @PrimaryGeneratedColumn('increment')
    id: string;

    @Column({ name: 'parent_id', nullable: true })
    parent_id: string;

    @Column()
    name: string;

    @Column()
    type: string;

    @Column()
    level: number;

    @Column()
    slug: string;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true })
    image: string;

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updated_at: Date;

    constructor(props: Partial<Category>) {
        Object.assign(this, props);
    }

    public getId() { return this.id; }
    public getName() { return this.name; }
    public getSlug() { return this.slug; }
    public getDescription() { return this.description; }
    public getImage() { return this.image; }

    public toJSON() {
        return {
            id: this.id,
            parent_id: this.parent_id,
            name: this.name,
            type: this.type,
            level: this.level,
            slug: this.slug,
            description: this.description,
            image: this.image,
            created_at: this.created_at,
            updated_at: this.updated_at,
        };
    }
}

