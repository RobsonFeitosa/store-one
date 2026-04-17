import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { ProcessAvatarUseCase } from 'src/modules/user/application/process-avatar.use-case';

@Controller()
export class MessageBrokerController {
    constructor(private processAvatar: ProcessAvatarUseCase) { }

    @EventPattern('avatar_uploaded')
    async handleAvatarUploaded(@Payload() data: any) {
        console.log('--- RABBITMQ CONSUMER ---');
        await this.processAvatar.execute(data);
    }
}