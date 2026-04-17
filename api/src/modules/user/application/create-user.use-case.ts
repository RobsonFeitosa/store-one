import { Inject, Injectable } from "@nestjs/common";
import { User as UserDomain } from "../domain/entities/user.entity";
import type { UserRepository } from "../domain/repositories/user.repository";
import { CreateUserDto } from "../infra/http/dtos/create-user.dto";
import { EmailAlreadyExists } from "../domain/errors/email-already-exists";
import type IHashProvider from "../infra/providers/HashProvider/models/IHashProvider";

@Injectable()
export class CreateUserUseCase {
    constructor(
        @Inject('USER_REPOSITORY_TOKEN')
        private readonly userRepository: UserRepository,

        @Inject('HASH_PROVIDER_TOKEN')
        private readonly hashProvider: IHashProvider,
    ) { }

    async execute(payload: CreateUserDto) {
        const userExists = await this.userRepository.findByEmail(payload.email);

        if (userExists) {
            throw new EmailAlreadyExists();
        }

        const hashedPassword = await this.hashProvider.generateHash(payload.password);

        const user = new UserDomain({ ...payload, password: hashedPassword });

        return this.userRepository.create(user);
    }
}