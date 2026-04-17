import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import type { UserRepository } from "../domain/repositories/user.repository";
import { UserNotFound } from "../domain/errors/user-not-found";
import type { IMessageBrokerProvider } from "src/shared/infra/http/providers/message-broker-provider/models/i-message-broker-provider";

interface IRequest {
    file: any;
    userId: string;
}

@Injectable()
export class UploadAvatarUseCase {
    constructor(
        @Inject("STORAGE_PROVIDER")
        private storageProvider: any,

        @Inject("USER_REPOSITORY_TOKEN")
        private usersRepository: UserRepository,


        @Inject("MESSAGE_BROKER_PROVIDER")
        private messageBroker: IMessageBrokerProvider,

    ) { }

    async execute({ file, userId }: IRequest) {
        const user = await this.usersRepository.findById(userId);
        if (!user) {
            throw new UserNotFound();
        }

        if (user.getAvatar()) {
            await this.storageProvider.deleteFile(user.getAvatar());
        }

        const fileName = await this.storageProvider.saveFile(file.filename);

        user.setAvatar(fileName);

        try {
            await this.messageBroker.publish('avatar_uploaded', {
                userId: user.getId(),
                path: fileName,
            });
        } catch (err) {
            console.error("Falha ao avisar o worker, mas o upload foi concluído");
        }

        await this.usersRepository.save(user);

        return {
            userId,
            avatarUrl: user.getAvatarUrl()
        };
    }
}