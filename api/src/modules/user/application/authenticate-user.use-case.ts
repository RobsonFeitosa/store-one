import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import type { UserRepository } from "../domain/repositories/user.repository";
import { CreateSessionDto } from "../infra/http/dtos/create-session.dto";
import type IHashProvider from "../infra/providers/HashProvider/models/IHashProvider";

@Injectable()
export class AuthenticateUserUseCase {
    constructor(
        @Inject('USER_REPOSITORY_TOKEN')
        private readonly userRepository: UserRepository,

        @Inject('HASH_PROVIDER_TOKEN')
        private readonly hashProvider: IHashProvider,
    ) { }

    async execute({ email, password }: CreateSessionDto) {
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new UnauthorizedException('E-mail ou senha incorretos');
        }

        const passwordMatched = await this.hashProvider.compareHash(password, user.password);

        if (!passwordMatched) {
            throw new UnauthorizedException('E-mail ou senha incorretos');
        }

        const token = await this.hashProvider.generateHash(user.id);

        const userResponse = user.toJSON();
        // @ts-ignore
        delete userResponse.password;

        return {
            user: userResponse,
            token,
        };
    }
}
