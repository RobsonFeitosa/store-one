import { Inject, Injectable } from "@nestjs/common";
import { User as UserDomain } from "../domain/entities/user.entity";
import type { UserRepository } from "../domain/repositories/user.repository";
import { CreateUserDto } from "../infra/http/dtos/create-user.dto";
import { EmailAlreadyExists } from "../domain/errors/email-already-exists";

@Injectable()
export class CreateUserUseCase {
    constructor(
        @Inject('UserRepository')
        private readonly userRepository: UserRepository
    ) { }

    async execute(payload: CreateUserDto) {
        const userExists = await this.userRepository.findByEmail(payload.email);

        if (userExists) {
            throw new EmailAlreadyExists();
        }

        const user = new UserDomain(payload);

        return this.userRepository.create(user)
    }
}