import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('users_settings')
export class UserSettingsEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: true })
    avatar: string;

    @Column({ type: 'int', default: 1 })
    level: 1 | 2;

    @Column({ nullable: true })
    cpf: string;

    @Column({ default: true })
    actived: boolean;

    @Column({ name: 'phone_number', nullable: true })
    phoneNumber: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
