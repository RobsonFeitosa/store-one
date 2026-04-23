import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn
} from 'typeorm';

@Entity('pd107_products_provider')
export class ProductProvider {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    phone1: string;

    @Column({ nullable: true })
    phone2: string;

    @Column({ nullable: true })
    email: string;

    @Column({ nullable: true })
    address: string;

    @OneToOne('Archive', 'referenceImage', {
        eager: true,
    })
    @JoinColumn({ name: 'image_id' })
    image: any;

    @Column({ name: 'image_id', nullable: true })
    image_id: string;

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updated_at: Date;

    constructor(props: Partial<ProductProvider>) {
        Object.assign(this, props);
    }

    public toJSON() {
        return {
            id: this.id,
            name: this.name,
            phone1: this.phone1,
            phone2: this.phone2,
            email: this.email,
            address: this.address,
            image: this.image?.toJSON ? this.image.toJSON() : this.image,
            created_at: this.created_at,
            updated_at: this.updated_at,
        };
    }
}
