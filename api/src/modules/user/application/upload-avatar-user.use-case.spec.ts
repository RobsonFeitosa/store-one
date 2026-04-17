import { UploadAvatarUseCase } from './upload-avatar-user.use-case';
import { UserRepository } from '../domain/repositories/user.repository';
import { UserNotFound } from '../domain/errors/user-not-found';
import { IMessageBrokerProvider } from 'src/shared/infra/http/providers/message-broker-provider/models/i-message-broker-provider';

describe('UploadAvatarUseCase', () => {
    let uploadAvatarUseCase: UploadAvatarUseCase;
    let storageProvider: any;
    let userRepository: jest.Mocked<UserRepository>;
    let messageBroker: jest.Mocked<IMessageBrokerProvider>;

    beforeEach(() => {
        storageProvider = {
            saveFile: jest.fn(),
            deleteFile: jest.fn(),
        };
        userRepository = {
            findById: jest.fn(),
            save: jest.fn(),
        } as any;
        messageBroker = {
            publish: jest.fn(),
        } as any;

        uploadAvatarUseCase = new UploadAvatarUseCase(storageProvider, userRepository, messageBroker);
    });

    it('should upload avatar and delete old one if exists', async () => {
        const userId = 'user-id';
        const file = { filename: 'new-avatar.png' };
        const mockUser = {
            getId: () => userId,
            getAvatar: jest.fn().mockReturnValue('old-avatar.png'),
            setAvatar: jest.fn(),
            getAvatarUrl: () => 'http://example.com/avatar.png',
        };

        userRepository.findById.mockResolvedValue(mockUser as any);
        storageProvider.saveFile.mockResolvedValue('new-avatar.png');

        const result = await uploadAvatarUseCase.execute({ userId, file });

        expect(userRepository.findById).toHaveBeenCalledWith(userId);
        expect(storageProvider.deleteFile).toHaveBeenCalledWith('old-avatar.png');
        expect(storageProvider.saveFile).toHaveBeenCalledWith(file.filename);
        expect(mockUser.setAvatar).toHaveBeenCalledWith('new-avatar.png');
        expect(userRepository.save).toHaveBeenCalledWith(mockUser);
        expect(messageBroker.publish).toHaveBeenCalledWith('avatar_uploaded', {
            userId,
            path: 'new-avatar.png',
        });
        expect(result.avatarUrl).toBe('http://example.com/avatar.png');
    });

    it('should throw UserNotFound if user does not exist', async () => {
        userRepository.findById.mockResolvedValue(null);

        await expect(uploadAvatarUseCase.execute({ userId: 'invalid', file: {} }))
            .rejects.toThrow(UserNotFound);
    });

    it('should not fail if message broker throws', async () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
        const userId = 'user-id';
        const file = { filename: 'new-avatar.png' };
        const mockUser = {
            getId: () => userId,
            getAvatar: jest.fn().mockReturnValue(null),
            setAvatar: jest.fn(),
            getAvatarUrl: () => 'http://example.com/avatar.png',
        };

        userRepository.findById.mockResolvedValue(mockUser as any);
        storageProvider.saveFile.mockResolvedValue('new-avatar.png');
        messageBroker.publish.mockRejectedValue(new Error('Broker failed'));

        const result = await uploadAvatarUseCase.execute({ userId, file });

        expect(result.avatarUrl).toBe('http://example.com/avatar.png');
        expect(userRepository.save).toHaveBeenCalled();
        expect(consoleSpy).toHaveBeenCalled();
        consoleSpy.mockRestore();
    });
});
