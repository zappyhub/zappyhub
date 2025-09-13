import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../../../config/database';

type Tokens = { accessToken: string; refreshToken: string };

export class AuthService {
  private readonly jwtSecret = process.env.JWT_SECRET || 'change-me';
  private readonly accessTtl = process.env.JWT_EXPIRES_IN || '15m';
  private readonly refreshTtl = process.env.JWT_REFRESH_EXPIRES_IN || '7d';

  // Registro de usuário com hash de senha
  async register(name: string, email: string, password: string) {
    const hashed = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: { name, email, password: hashed },
      select: { id: true, name: true, email: true, createdAt: true }
    });
    return user;
  }

  // Login: valida credenciais e emite tokens
  async login(email: string, password: string): Promise<{ user: any; tokens: Tokens }> {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      const err: any = new Error('Credenciais inválidas');
      err.status = 401;
      throw err;
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      const err: any = new Error('Credenciais inválidas');
      err.status = 401;
      throw err;
    }

    const tokens = this.issueTokens(user.id);
    const safeUser = { id: user.id, name: user.name, email: user.email, createdAt: user.createdAt };
    return { user: safeUser, tokens };
  }

  // Emissão de access e refresh token
  issueTokens(userId: string): Tokens {
    const accessToken = jwt.sign({ sub: userId, typ: 'access' }, this.jwtSecret, { expiresIn: this.accessTtl });
    const refreshToken = jwt.sign({ sub: userId, typ: 'refresh' }, this.jwtSecret, { expiresIn: this.refreshTtl });
    return { accessToken, refreshToken };
  }

  // Troca de refresh por um novo access token
  refresh(refreshToken: string): Tokens {
    try {
      const payload = jwt.verify(refreshToken, this.jwtSecret) as any;
      if (payload.typ !== 'refresh') {
        const err: any = new Error('Token inválido');
        err.status = 401;
        throw err;
      }
      return this.issueTokens(payload.sub);
    } catch {
      const err: any = new Error('Token inválido ou expirado');
      err.status = 401;
      throw err;
    }
  }
}

