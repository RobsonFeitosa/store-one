import { Test, TestingModule } from '@nestjs/testing';
import { UploadAvatarController } from './upload-avatar-user.controller';
import { UploadAvatarUseCase } from 'src/modules/user/application/upload-avatar-user.use-case';

describe('UploadAvatarController', () => {
    let controller: UploadAvatarController;
    let uploadAvatarUseCase: UploadAvatarUseCase;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UploadAvatarController],
            providers: [
                {
                    provide: UploadAvatarUseCase,
                    useValue: {
                        execute: jest.fn().mockResolvedValue({
                            userId: 'user-id',
                            avatarUrl: 'http://example.com/avatar.png',
                        }),
                    },
                },
            ],
        }).compile();

        controller = module.get<UploadAvatarController>(UploadAvatarController);
        uploadAvatarUseCase = module.get<UploadAvatarUseCase>(UploadAvatarUseCase);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('handle', () => {
        it('should call uploadAvatarUseCase.execute with correct parameters', async () => {
            const userId = 'user-id';
            const file = {
                filename: 'avatar.png',
                originalname: 'avatar.png',
                mimetype: 'image/png',
                size: 1024,
            } as Express.Multer.File;

            const result = await controller.handle(userId, file);

            expect(uploadAvatarUseCase.execute).toHaveBeenCalledWith({
                userId,
                file,
            });
            expect(result).toEqual({
                userId: 'user-id',
                avatarUrl: 'http://example.com/avatar.png',
            });
        });
    });
});
