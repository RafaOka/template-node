import { NextFunction, Request, Response } from 'express';
import { Secret, verify } from 'jsonwebtoken';
import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
  iss: string;
}

export default function ensureAuthenticated(
  req: Request, res: Response, next: NextFunction,
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT Token não informado', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret as Secret);

    const { sub } = decoded as ITokenPayload;

    req.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError('JWT Token invalido', 401);
  }
}
