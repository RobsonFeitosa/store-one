import { Injectable, Inject } from "@nestjs/common";
import type { UserRepository } from "../domain/repositories/user.repository";
import { FilterOptions } from "../domain/types/filter-options";

@Injectable()
export class IndexUserUseCase {
    constructor(
        @Inject('USER_REPOSITORY_TOKEN')
        private readonly userRepository: UserRepository
    ) { }


    async execute(options: FilterOptions) {
        const [users, total] = await this.userRepository.findAll(options);
        return { users, total };
    }
}