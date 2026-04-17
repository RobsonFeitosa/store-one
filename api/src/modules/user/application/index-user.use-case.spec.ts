import { IndexUserUseCase } from './index-user.use-case';
import { UserRepository } from '../domain/repositories/user.repository';

describe('IndexUserUseCase', () => {
    let indexUserUseCase: IndexUserUseCase;
    let userRepository: jest.Mocked<UserRepository>;

    beforeEach(() => {
        userRepository = {
            findAll: jest.fn(),
        } as any;

        indexUserUseCase = new IndexUserUseCase(userRepository);
    });

    it('should return paginated users', async () => {
        const options = { page: 1, limit: 10 };
        const mockUsers = [{ getName: () => 'User 1' }, { getName: () => 'User 2' }];
        const mockTotal = 2;

        userRepository.findAll.mockResolvedValue([mockUsers as any, mockTotal]);

        const result = await indexUserUseCase.execute(options);

        expect(userRepository.findAll).toHaveBeenCalledWith(options);
        expect(result).toEqual({ users: mockUsers, total: mockTotal });
    });
});
