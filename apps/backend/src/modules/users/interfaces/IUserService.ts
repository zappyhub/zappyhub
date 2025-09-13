import { CreateUserDTO } from '../dtos/CreateUserDTO';

export interface IUserService {
  getAll(): Promise<any[]>;
  getById(id: string): Promise<any | null>;
  create(data: CreateUserDTO): Promise<any>;
  update(id: string, data: Partial<CreateUserDTO>): Promise<any>;
  delete(id: string): Promise<boolean>;
}

