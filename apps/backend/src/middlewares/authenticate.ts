import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  userId?: string;
}

export function authenticate(req: AuthRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Não autenticado' });
  }

  const token = header.substring(7);
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'change-me') as any;
    if (payload.typ !== 'access') {
      return res.status(401).json({ success: false, message: 'Token inválido' });
    }
    req.userId = payload.sub;
    next();
  } catch {
    return res.status(401).json({ success: false, message: 'Token inválido ou expirado' });
  }
}

