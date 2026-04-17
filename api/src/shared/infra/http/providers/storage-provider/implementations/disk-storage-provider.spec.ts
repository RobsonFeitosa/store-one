import { DiskStorageProvider } from './disk-storage-provider';
import uploadConfig from '../../../constants/upload';
import fs from 'fs';
import path from 'path';

jest.mock('fs', () => {
    return {
        promises: {
            rename: jest.fn(),
            stat: jest.fn(),
            unlink: jest.fn(),
        },
    };
});

jest.mock('../../../constants/upload', () => ({
    __esModule: true,
    default: {
        tmpFolder: '/tmp',
        uploadsFolder: '/uploads',
    },
}));

describe('DiskStorageProvider', () => {
    let diskStorageProvider: DiskStorageProvider;

    beforeEach(() => {
        diskStorageProvider = new DiskStorageProvider();
        jest.clearAllMocks();
    });

    describe('saveFile', () => {
        it('should move file from tmp folder to uploads folder', async () => {
            const renameSpy = jest.spyOn(fs.promises, 'rename').mockResolvedValue(undefined);

            const fileName = 'test-file.png';
            const result = await diskStorageProvider.saveFile(fileName);

            expect(renameSpy).toHaveBeenCalledWith(
                path.resolve(uploadConfig.tmpFolder, fileName),
                path.resolve(uploadConfig.uploadsFolder, fileName)
            );
            expect(result).toBe(fileName);
        });
    });

    describe('deleteFile', () => {
        it('should delete file from uploads folder if it exists', async () => {
            const statSpy = jest.spyOn(fs.promises, 'stat').mockResolvedValue({} as any);
            const unlinkSpy = jest.spyOn(fs.promises, 'unlink').mockResolvedValue(undefined);

            const fileName = 'test-file.png';
            await diskStorageProvider.deleteFile(fileName);

            expect(statSpy).toHaveBeenCalledWith(
                path.resolve(uploadConfig.uploadsFolder, fileName)
            );
            expect(unlinkSpy).toHaveBeenCalledWith(
                path.resolve(uploadConfig.uploadsFolder, fileName)
            );
        });

        it('should not delete file if it does not exist', async () => {
            jest.spyOn(fs.promises, 'stat').mockRejectedValue(new Error());
            const unlinkSpy = jest.spyOn(fs.promises, 'unlink');

            await diskStorageProvider.deleteFile('non-existent-file.png');

            expect(unlinkSpy).not.toHaveBeenCalled();
        });
    });
});
