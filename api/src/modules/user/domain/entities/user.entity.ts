import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    OneToOne,
    OneToMany,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
    type Relation
} from "typeorm";
import { UserSettings } from "./user-settings.entity";
import type { Address } from "../../../address/domain/entities/address.entity";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ name: 'settings_id', nullable: true })
    settings_id: string;

    @OneToOne(() => UserSettings, { cascade: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'settings_id' })
    settings: UserSettings;

    @OneToMany('Address', 'user')
    addresses: Relation<Address[]>;

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updated_at: Date;

    constructor(props: Partial<User>) {
        Object.assign(this, props);
    }

    public getId() { return this.id; }
    public getName() { return this.name; }
    public getEmail() { return this.email; }
    public getSettingsId() { return this.settings_id; }

    public getAvatar() { return this.settings?.avatar; }

    public setAvatar(avatar: string) {
        if (!this.settings) {
            this.settings = new UserSettings({});
        }
        this.settings.avatar = avatar;
    }

    public getAvatarUrl() { 
        return this.settings?.getAvatarUrl(); 
    }

    public toJSON() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            password: this.password,
            avatar_url: this.getAvatarUrl(),
            settings_id: this.settings_id,
            settings: this.settings,
            created_at: this.created_at,
            updated_at: this.updated_at,
        };
    }
}