import { EmailAlreadyExists } from "../domain/errors/email-already-exists";
import { UserRepository } from "../domain/repositories/user.repository";
import { CreateUserUseCase } from "./create-user.use-case";

describe('CreateUserUseCase', () => {
    let createUserUseCase: CreateUserUseCase;
    let userRepository: jest.Mocked<UserRepository>

    beforeEach(() => {
        userRepository = {
            create: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
            findByEmail: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
        } as any;

        createUserUseCase = new CreateUserUseCase(userRepository)
    })

    it('should create a user when email is not taken', async () => {
        const payload = {
            name: 'John Doe',
            email: 'john@example.com',
            password: 'password123',
        };

        userRepository.findByEmail.mockResolvedValue(null);
        userRepository.create.mockImplementation(async (user) => user);

        const result = await createUserUseCase.execute(payload);

        expect(userRepository.findByEmail).toHaveBeenCalledWith(payload.email);
        expect(userRepository.create).toHaveBeenCalled();
        expect(result.getName()).toBe(payload.name);
        expect(result.getEmail()).toBe(payload.email);
    })

    it('should throw EmailAlreadyExists when email is taken', async () => {
        const payload = {
            name: 'John Doe',
            email: 'john@example.com',
            password: 'password123',
        };

        userRepository.findByEmail.mockResolvedValue({} as any);

        await expect(createUserUseCase.execute(payload)).rejects.toThrow(EmailAlreadyExists);
    })
})