import { User as UserDomain } from "../entities/user.entity";
import { FilterOptions } from "../types/filter-options";

export interface UserRepository {
    create(user: UserDomain): Promise<UserDomain>;
    findAll(filterOptions: FilterOptions): Promise<[UserDomain[], number]>;
    findById(id: string): Promise<UserDomain | null>;
    findByEmail(email: string): Promise<UserDomain | null>;
    save(user: UserDomain): Promise<UserDomain>;
    delete(id: string): Promise<void>;
}