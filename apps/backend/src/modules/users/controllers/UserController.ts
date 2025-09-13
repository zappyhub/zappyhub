import { Request, Response, NextFunction } from 'express';
import { IUserService } from '../interfaces/IUserService';
import { CreateUserDTO } from '../dtos/CreateUserDTO';
import { validate } from 'class-validator';

export class UserController {
  constructor(private readonly userService: IUserService) {}

  async listUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.userService.getAll();
      res.json(users);
    } catch (error) {
      next(error);
    }
  }

  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.userService.getById(req.params.id);
      if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = new CreateUserDTO();
      Object.assign(dto, req.body);

      const errors = await validate(dto);
      if (errors.length > 0) {
        res.status(400).json({
          success: false,
          errors: errors.map(e => ({
            property: e.property,
            constraints: e.constraints
          }))
        });
        return;
      }

      const newUser = await this.userService.create(dto);
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const updatedUser = await this.userService.update(req.params.id, req.body);
      res.json(updatedUser);
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      await this.userService.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

