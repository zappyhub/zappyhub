import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/AuthService';

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: 'Campos obrigatórios: name, email, password' });
      }
      const user = await this.authService.register(name, email, password);
      res.status(201).json({ success: true, user });
    } catch (error: any) {
      if (error?.code === 'P2002') {
        // Prisma unique constraint
        return res.status(409).json({ success: false, message: 'E-mail já cadastrado' });
      }
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Campos obrigatórios: email, password' });
      }
      const { user, tokens } = await this.authService.login(email, password);
      res.json({ success: true, user, ...tokens });
    } catch (error) {
      next(error);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) {
        return res.status(400).json({ success: false, message: 'refreshToken é obrigatório' });
      }
      const tokens = this.authService.refresh(refreshToken);
      res.json({ success: true, ...tokens });
    } catch (error) {
      next(error);
    }
  }
}

