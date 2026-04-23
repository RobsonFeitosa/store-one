import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';

@Entity('ti100_time_discount')
export class TimeDiscount {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'start_date' })
    start_date: Date;

    @Column({ name: 'end_date' })
    end_date: Date;

    @Column({ type: 'bigint', nullable: true })
    discount: number;

    @Column()
    status: string;

    @OneToMany('Product', 'time_discount')
    products: any[];

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updated_at: Date;

    constructor(props: Partial<TimeDiscount>) {
        Object.assign(this, props);
        if (props?.discount !== undefined) {
            this.discount = Math.round(Number(props.discount));
        }
    }

    public toJSON() {
        return {
            id: this.id,
            start_date: this.start_date,
            end_date: this.end_date,
            discount: this.discount,
            status: this.status,
            created_at: this.created_at,
            updated_at: this.updated_at,
        };
    }
}
