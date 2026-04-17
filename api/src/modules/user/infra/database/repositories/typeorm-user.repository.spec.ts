import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmUserRepository } from './typeorm-user.repository';
import { User } from 'src/modules/user/domain/entities/user.entity';

describe('TypeOrmUserRepository', () => {
    let repository: TypeOrmUserRepository;
    let ormRepo: jest.Mocked<Repository<User>>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TypeOrmUserRepository,
                {
                    provide: getRepositoryToken(User),
                    useValue: {
                        save: jest.fn(),
                        findOne: jest.fn(),
                        findOneBy: jest.fn(),
                        findAndCount: jest.fn(),
                        delete: jest.fn(),
                    },
                },
            ],
        }).compile();

        repository = module.get<TypeOrmUserRepository>(TypeOrmUserRepository);
        ormRepo = module.get(getRepositoryToken(User));
    });


    it('should be defined', () => {
        expect(repository).toBeDefined();
    });

    describe('create', () => {
        it('should create and return a user', async () => {
            const userDomain = new User({
                name: 'John Doe',
                email: 'john@example.com',
            });

            const userEntity = {
                id: 'any_id',
                name: 'John Doe',
                email: 'john@example.com',
            };

            ormRepo.save.mockResolvedValue(userEntity as any);

            const result = await repository.create(userDomain);

            expect(ormRepo.save).toHaveBeenCalled();
            expect(result).toBeInstanceOf(User);
            expect(result.getEmail()).toBe(userEntity.email);
        });
    });

    describe('findById', () => {
        it('should return a user if found', async () => {
            const userEntity = {
                id: 'any_id',
                name: 'John Doe',
                email: 'john@example.com',
            };

            ormRepo.findOneBy.mockResolvedValue(userEntity as any);

            const result = await repository.findById('any_id');

            expect(ormRepo.findOneBy).toHaveBeenCalledWith({ id: 'any_id' });
            expect(result?.getEmail()).toBe(userEntity.email);
        });

        it('should return null if user is not found', async () => {
            ormRepo.findOneBy.mockResolvedValue(null);

            const result = await repository.findById('invalid_id');

            expect(result).toBeNull();
        });
    });

    describe('findByEmail', () => {
        it('should return a user if found by email', async () => {
            const userEntity = {
                id: 'any_id',
                name: 'John Doe',
                email: 'john@example.com',
            };

            ormRepo.findOneBy.mockResolvedValue(userEntity as any);

            const result = await repository.findByEmail('john@example.com');

            expect(ormRepo.findOneBy).toHaveBeenCalledWith({ email: 'john@example.com' });
            expect(result?.getEmail()).toBe('john@example.com');
        });
    });

    describe('findAll', () => {
        it('should return paginated users', async () => {
            const userEntities = [
                { id: '1', name: 'User 1', email: 'user1@example.com' },
                { id: '2', name: 'User 2', email: 'user2@example.com' },
            ];
            const total = 2;

            ormRepo.findAndCount.mockResolvedValue([userEntities as any, total]);

            const [users, resultTotal] = await repository.findAll({ page: 1, limit: 10 });

            expect(ormRepo.findAndCount).toHaveBeenCalled();
            expect(users).toHaveLength(2);
            expect(resultTotal).toBe(total);
            expect(users[0]).toBeInstanceOf(User);
        });
    });

    describe('delete', () => {
        it('should call ormRepo.delete with correct id', async () => {
            await repository.delete('any_id');
            expect(ormRepo.delete).toHaveBeenCalledWith('any_id');
        });
    });

    describe('save', () => {
        it('should save and return updated user', async () => {
            const userDomain = new User({
                id: 'any_id',
                name: 'Updated Name',
                email: 'john@example.com',
            });

            const userEntity = {
                id: 'any_id',
                name: 'Updated Name',
                email: 'john@example.com',
            };

            ormRepo.save.mockResolvedValue(userEntity as any);

            const result = await repository.save(userDomain);

            expect(ormRepo.save).toHaveBeenCalled();
            expect(result.getName()).toBe('Updated Name');
        });
    });
});
