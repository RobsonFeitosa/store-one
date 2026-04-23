import { Inject, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { User as UserDomain } from "../domain/entities/user.entity";
import type { UserRepository } from "../domain/repositories/user.repository";
import type UserSettingsRepository from "../domain/repositories/user-settings.repository";
import { CreateUserDto } from "../infra/http/dtos/create-user.dto";
import { EmailAlreadyExists } from "../domain/errors/email-already-exists";
import type IHashProvider from "../infra/providers/HashProvider/models/IHashProvider";



@Injectable()
export class CreateUserUseCase {
    constructor(
        @Inject('USER_REPOSITORY_TOKEN')
        private readonly userRepository: UserRepository,


        @Inject('USER_SETTINGS_REPOSITORY_TOKEN')
        private userSettingsRepository: UserSettingsRepository,

        @Inject('HASH_PROVIDER_TOKEN')
        private readonly hashProvider: IHashProvider,

    ) { }

    public async execute(payload: CreateUserDto) {
        const checkUserExists = await this.userRepository.findByEmail(
            payload.email,
        )

        if (checkUserExists) {
            throw new EmailAlreadyExists()
        }

        const hashedPassword = await this.hashProvider.generateHash(
            payload.password,
        )

        const { name, password, email, user_id, ...settings } = payload

        const userSettings = await this.userSettingsRepository.create({
            ...settings,
            level: settings.level ?? 2,
            actived: settings.actived ?? true,
        })

        const user = await this.userRepository.create(new UserDomain({
            id: user_id,
            email,
            name,
            password: hashedPassword,
            settings_id: userSettings.id,
        }))


        await this.sendActivedUserEmail(user)

        const newUser: any = { ...userSettings, ...user }

        delete newUser.password

        return {
            ...newUser,
            created_at: newUser.created_at,
            updated_at: newUser.updated_at,
        }
    }

    public async sendActivedUserEmail(user: any) {
        // const { token } = await this.userTokensRepository.generate(user.id)

        // const activedTemplate = path.resolve(
        //     __dirname,
        //     '..',
        //     'views',
        //     'actived_account.hbs',
        // )

        // await this.mailProvider.sendMail({
        //     to: {
        //         name: user.name,
        //         email: user.email,
        //     },
        //     subject: '[StoreOne] Ativação da conta',
        //     templateData: {
        //         file: activedTemplate,
        //         variables: {
        //             name: user.name,
        //             token,
        //             link: `${process.env.APP_WEB_URL}/actived/?token=${token}`,
        //         },
        //     },
        // })
    }
}