import { Inject, Injectable, UnauthorizedException, NotFoundException } from "@nestjs/common";
import type { UserRepository } from "../domain/repositories/user.repository";
import { CreateSessionDto } from "../infra/http/dtos/create-session.dto";
import authConfig from './../../../config/auth'
import { sign } from 'jsonwebtoken'
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
            throw new UnauthorizedException('Incorrect email/password combination.');
        }

        const userSettings = user.settings;

        if (!userSettings) {
            throw new NotFoundException('Settings not found.');
        }

        const passwordMatched = await this.hashProvider.compareHash(password, user.password);

        if (!userSettings.actived) {
            // TODO: call MailProvider/TokenRepository to send activation email
            // this.sendActivedUserEmail(user);
            return { user: {} as any, token: 'inactive-user--resend-mail' };
        }

        if (!passwordMatched) {
            throw new UnauthorizedException('Incorrect email/password combination.');
        }

        const { secret, expiresIn } = authConfig.jwt;

        const token = sign(
            {},
            secret as string,
            {
                subject: user.id,
                expiresIn,
            }
        );

        // Keep the nested settings object as well as the flattened structure to support frontend
        const newUser = { ...userSettings, ...user.toJSON() };

        // @ts-ignore
        delete newUser.password;

        return {
            user: newUser,
            token,
        };
    }
}
