import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('ar100_archives')
export class ArchiveEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    origin_target: string;

    @Column()
    reference_id: string;

    @Column()
    name: string;

    @Column({ default: false })
    is_primary: boolean;

    @Column()
    size: string;

    @Column()
    type: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
