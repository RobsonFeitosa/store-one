import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('cp100_coupon')
export class Coupon {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'code_coupon' })
    code_coupon: string;

    @Column()
    status: string;

    @Column({ type: 'bigint' })
    discount: number;

    @Column({ type: 'timestamp' })
    validation: Date;

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updated_at: Date;

    constructor(props: Partial<Coupon>) {
        Object.assign(this, props);
        if (props?.discount !== undefined) {
            this.discount = Math.round(Number(props.discount));
        }
    }

    public toJSON() {
        return {
            id: this.id,
            code_coupon: this.code_coupon,
            status: this.status,
            discount: this.discount,
            validation: this.validation,
            created_at: this.created_at,
            updated_at: this.updated_at,
        };
    }
}
