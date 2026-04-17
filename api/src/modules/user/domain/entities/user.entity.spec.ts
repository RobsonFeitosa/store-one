import { User } from './user.entity';
import uploadConfig from 'src/shared/infra/http/constants/upload';

jest.mock('src/shared/infra/http/constants/upload', () => ({
    __esModule: true,
    default: {
        driver: 'disk',
        config: {
            aws: {
                bucket: 'test-bucket',
            },
        },
    },
}));

describe('User Domain Entity', () => {
    const originalEnv = process.env;

    beforeEach(() => {
        jest.resetModules();
        process.env = { ...originalEnv, APP_API_URL: 'http://localhost:3000' };
    });

    afterAll(() => {
        process.env = originalEnv;
    });

    it('should be able to create a new user', () => {
        const user = new User({
            name: 'John Doe',
            email: 'john@example.com',
            password: 'password123',
        });

        expect(user).toBeDefined();
        expect(user.getName()).toBe('John Doe');
        expect(user.getEmail()).toBe('john@example.com');
    });

    it('should throw an error if name is less than 3 characters', () => {
        expect(() => {
            new User({
                name: 'Jo',
                email: 'john@example.com',
            });
        }).toThrow('Name must be at least 3 characters long');
    });

    it('should generate a default id if not provided', () => {
        const user = new User({
            name: 'John Doe',
            email: 'john@example.com',
        });

        expect(user.getId()).toBe('7f642468-80f4-41d4-9d90-64292850901e');
    });

    it('should use provided id', () => {
        const id = 'custom-id';
        const user = new User({
            id,
            name: 'John Doe',
            email: 'john@example.com',
        });

        expect(user.getId()).toBe(id);
    });

    describe('getAvatarUrl', () => {
        it('should return null if no avatar is set', () => {
            const user = new User({
                name: 'John Doe',
                email: 'john@example.com',
            });

            expect(user.getAvatarUrl()).toBeNull();
        });

        it('should return local disk url when driver is disk', () => {
            const user = new User({
                name: 'John Doe',
                email: 'john@example.com',
            });
            user.setAvatar('avatar.png');

            (uploadConfig.driver as any) = 'disk';

            expect(user.getAvatarUrl()).toBe('http://localhost:3000/files/avatar.png');
        });

        it('should return S3 url when driver is s3', () => {
            const user = new User({
                name: 'John Doe',
                email: 'john@example.com',
            });
            user.setAvatar('avatar.png');

            (uploadConfig.driver as any) = 's3';

            expect(user.getAvatarUrl()).toBe('https://test-bucket.s3.amazonaws.com/avatar.png');
        });

        it('should return null if driver is unknown', () => {
            const user = new User({
                name: 'John Doe',
                email: 'john@example.com',
            });
            user.setAvatar('avatar.png');

            (uploadConfig.driver as any) = 'unknown';

            expect(user.getAvatarUrl()).toBeNull();
        });
    });

    it('should be able to convert to JSON', () => {
        const user = new User({
            name: 'John Doe',
            email: 'john@example.com',
            password: '123',
        });
        user.setAvatar('avatar.png');
        (uploadConfig.driver as any) = 'disk';

        const json = user.toJSON();

        expect(json).toEqual({
            id: '7f642468-80f4-41d4-9d90-64292850901e',
            name: 'John Doe',
            email: 'john@example.com',
            password: '123',
            avatar: 'avatar.png',
            avatar_url: expect.any(String),
        });
    });
});
