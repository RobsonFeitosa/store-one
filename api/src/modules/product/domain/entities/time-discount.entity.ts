import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Tenant } from '../../../tenant/domain/entities/tenant.entity';

@Entity('ti100_time_discount')
export class TimeDiscount {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'start_date' })
    startDate: Date;

    @Column({ name: 'end_date' })
    endDate: Date;

    @Column({ type: 'bigint', nullable: true })
    discount: number;

    @Column()
    status: string;

    @OneToMany('Product', 'time_discount')
    products: any[];

    @Column({ name: 'tenant_id', nullable: true })
    tenant_id: string;

    @ManyToOne(() => Tenant)
    @JoinColumn({ name: 'tenant_id' })
    tenant: Tenant;

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
            startDate: this.startDate,
            endDate: this.endDate,
            discount: this.discount,
            status: this.status,
            tenant_id: this.tenant_id,
            created_at: this.created_at,
            updated_at: this.updated_at,
        };
    }
}
