import { UnauthorizedException, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
    let guard: AuthGuard;
    let mockExecutionContext: any;

    beforeEach(() => {
        guard = new AuthGuard();
    });

    it('should be defined', () => {
        expect(guard).toBeDefined();
    });

    it('should throw UnauthorizedException if no token is found', async () => {
        mockExecutionContext = {
            switchToHttp: jest.fn().mockReturnThis(),
            getRequest: jest.fn().mockReturnValue({
                headers: {},
            }),
        } as unknown as ExecutionContext;

        await expect(guard.canActivate(mockExecutionContext)).rejects.toThrow(
            new UnauthorizedException('Token não encontrado')
        );
    });

    it('should throw UnauthorizedException if token type is not Bearer', async () => {
        mockExecutionContext = {
            switchToHttp: jest.fn().mockReturnThis(),
            getRequest: jest.fn().mockReturnValue({
                headers: {
                    authorization: 'Basic anytoken',
                },
            }),
        } as unknown as ExecutionContext;

        await expect(guard.canActivate(mockExecutionContext)).rejects.toThrow(
            new UnauthorizedException('Token não encontrado')
        );
    });

    it('should throw UnauthorizedException if token is invalid', async () => {
        mockExecutionContext = {
            switchToHttp: jest.fn().mockReturnThis(),
            getRequest: jest.fn().mockReturnValue({
                headers: {
                    authorization: 'Bearer invalid-token',
                },
            }),
        } as unknown as ExecutionContext;

        await expect(guard.canActivate(mockExecutionContext)).rejects.toThrow(
            new UnauthorizedException('Token inválido')
        );
    });

    it('should return true if token is valid', async () => {
        mockExecutionContext = {
            switchToHttp: jest.fn().mockReturnThis(),
            getRequest: jest.fn().mockReturnValue({
                headers: {
                    authorization: 'Bearer meu-token-secreto',
                },
            }),
        } as unknown as ExecutionContext;

        const result = await guard.canActivate(mockExecutionContext);

        expect(result).toBe(true);
    });
});
