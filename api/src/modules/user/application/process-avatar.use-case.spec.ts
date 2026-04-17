import { ProcessAvatarUseCase } from './process-avatar.use-case';

describe('ProcessAvatarUseCase', () => {
    let processAvatarUseCase: ProcessAvatarUseCase;

    beforeEach(() => {
        processAvatarUseCase = new ProcessAvatarUseCase();
    });

    it('should log the process of the avatar', async () => {
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
        const payload = { path: 'any_path.png' };

        await processAvatarUseCase.execute(payload);

        expect(consoleSpy).toHaveBeenCalledWith('Processando imagem em background...', payload.path);
        consoleSpy.mockRestore();
    });
});
