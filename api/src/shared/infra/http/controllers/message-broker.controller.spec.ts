import { Test, TestingModule } from '@nestjs/testing';
import { MessageBrokerController } from './message-broker.controller';
import { ProcessAvatarUseCase } from 'src/modules/user/application/process-avatar.use-case';

describe('MessageBrokerController', () => {
    let controller: MessageBrokerController;
    let processAvatarUseCase: ProcessAvatarUseCase;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [MessageBrokerController],
            providers: [
                {
                    provide: ProcessAvatarUseCase,
                    useValue: {
                        execute: jest.fn().mockResolvedValue(undefined),
                    },
                },
            ],
        }).compile();

        controller = module.get<MessageBrokerController>(MessageBrokerController);
        processAvatarUseCase = module.get<ProcessAvatarUseCase>(ProcessAvatarUseCase);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('handleAvatarUploaded', () => {
        it('should call processAvatarUseCase.execute with correct data', async () => {
            const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
            const data = {
                userId: '7f642468-80f4-41d4-9d90-64292850901e',
                path: 'avatar.png',
            };

            await controller.handleAvatarUploaded(data);

            expect(processAvatarUseCase.execute).toHaveBeenCalledWith(data);
            expect(consoleSpy).toHaveBeenCalled();
            consoleSpy.mockRestore();
        });
    });
});
