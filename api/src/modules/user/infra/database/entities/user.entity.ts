import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";
import { UserSettingsEntity } from "./user-settings.entity";

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ name: 'settings_id', nullable: true })
    settingsId: string;

    @OneToOne(() => UserSettingsEntity, { cascade: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'settings_id' })
    settings: UserSettingsEntity;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}   