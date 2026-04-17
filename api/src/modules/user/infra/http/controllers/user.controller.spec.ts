import { Test, TestingModule } from "@nestjs/testing";
import { UserController } from "./user.controller";
import { CreateUserUseCase } from "src/modules/user/application/create-user.use-case";
import { IndexUserUseCase } from "src/modules/user/application/index-user.use-case";

describe('UserController', () => {
    let userController: UserController;
    let userCreateUseCase: CreateUserUseCase;
    let userIndexUseCase: IndexUserUseCase;


    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [
                {
                    provide: CreateUserUseCase,
                    useValue: {
                        execute: jest.fn().mockResolvedValue({
                            id: 'any_id',
                            name: 'John Doe',
                            email: 'john@example.com'
                        })
                    }
                },
                {
                    provide: IndexUserUseCase,
                    useValue: {
                        execute: jest.fn().mockResolvedValue({
                            users: [],
                            total: 0
                        })
                    }
                }
            ],
        }).compile();

        userController = app.get<UserController>(UserController);
        userCreateUseCase = app.get<CreateUserUseCase>(CreateUserUseCase);
        userIndexUseCase = app.get<IndexUserUseCase>(IndexUserUseCase);
    })

    it('should be defined', () => {
        expect(userController).toBeDefined();
    })

    describe('CreateUser', () => {
        it('should call CreateUserUseCase.execute with correct parameters', async () => {
            const payload = {
                name: 'John Doe',
                email: 'john@example.com',
                password: 'password123',
            };

            await userController.createUser(payload);

            expect(userCreateUseCase.execute).toHaveBeenCalledWith(payload);
        });

        it('should return the rsult of CreateUserUseCase.execute', async () => {
            const payload = {
                name: 'John Doe',
                email: 'john@example.com',
                password: 'password123',
            };

            const result = await userController.createUser(payload);

            expect(result).toEqual({
                id: 'any_id',
                name: 'John Doe',
                email: 'john@example.com'
            });
        });
    })

    describe('IndexUser', () => {
        it('should call IndexUserUseCase.execute with correct parameters', async () => {
            const query = {
                page: 1,
                limit: 10,
                search: 'John'
            };

            await userController.findAll(query);

            expect(userIndexUseCase.execute).toHaveBeenCalledWith(query);
        });
    })
})