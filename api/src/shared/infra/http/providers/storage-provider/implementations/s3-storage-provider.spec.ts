import aws from 'aws-sdk';
import fs from 'fs';
import path from 'path';
import mime from 'mime';
import { S3StorageProvider } from './s3-storage-provider';
import uploadConfig from '../../../constants/upload';

jest.mock('aws-sdk');
jest.mock('fs', () => ({
    promises: {
        readFile: jest.fn(),
        unlink: jest.fn(),
    },
}));

jest.mock('../../../constants/upload', () => ({
    __esModule: true,
    default: {
        tmpFolder: '/tmp',
        uploadsFolder: '/uploads',
        config: {
            aws: {
                bucket: 'test-bucket',
            },
        },
    },
}));
jest.mock('mime');

describe('S3StorageProvider', () => {
    let s3StorageProvider: S3StorageProvider;
    let putObjectMock: jest.Mock;
    let deleteObjectMock: jest.Mock;

    beforeEach(() => {
        putObjectMock = jest.fn().mockReturnValue({
            promise: jest.fn().mockResolvedValue(undefined),
        });
        deleteObjectMock = jest.fn().mockReturnValue({
            promise: jest.fn().mockResolvedValue(undefined),
        });

        (aws.S3 as unknown as jest.Mock).mockImplementation(() => ({
            putObject: putObjectMock,
            deleteObject: deleteObjectMock,
        }));

        s3StorageProvider = new S3StorageProvider();
        jest.clearAllMocks();
    });

    describe('saveFile', () => {
        it('should upload file to S3 and delete local file', async () => {
            const fileName = 'test-file.png';
            const fileContent = Buffer.from('file-content');
            const contentType = 'image/png';

            (mime.getType as jest.Mock).mockReturnValue(contentType);
            (fs.promises.readFile as jest.Mock).mockResolvedValue(fileContent);
            const unlinkSpy = jest.spyOn(fs.promises, 'unlink').mockResolvedValue(undefined);

            const result = await s3StorageProvider.saveFile(fileName);

            expect(putObjectMock).toHaveBeenCalledWith({
                Bucket: uploadConfig.config.aws.bucket,
                Key: fileName,
                ACL: 'public-read',
                Body: fileContent,
                ContentType: contentType,
            });
            expect(unlinkSpy).toHaveBeenCalledWith(
                path.resolve(uploadConfig.tmpFolder, fileName)
            );
            expect(result).toBe(fileName);
        });

        it('should throw error if content type is not found', async () => {
            const fileName = 'test-file.unknown';
            (mime.getType as jest.Mock).mockReturnValue(null);

            await expect(s3StorageProvider.saveFile(fileName)).rejects.toThrow('File not found');
        });
    });

    describe('deleteFile', () => {
        it('should delete file from S3', async () => {
            const fileName = 'test-file.png';

            await s3StorageProvider.deleteFile(fileName);

            expect(deleteObjectMock).toHaveBeenCalledWith({
                Bucket: uploadConfig.config.aws.bucket,
                Key: fileName,
            });
        });
    });
});
