import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from 'src/config/auth';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (isPublic) {
            return true;
        }

        const request = context.switchToHttp().getRequest<Request>();
        const token = this.extractTokenFromHeader(request);

        if (!token) {
            throw new UnauthorizedException('Token não encontrado');
        }

        try {
            const decoded = verify(token, authConfig.jwt.secret);

            const { sub } = decoded as TokenPayload;

            request.user = {
                id: sub,
            };

            return true;
        } catch {
            throw new UnauthorizedException('Token inválido');
        }
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}