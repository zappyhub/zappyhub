import { IUserService } from '../interfaces/IUserService';
import { CreateUserDTO } from '../dtos/CreateUserDTO';
import redisClient from '../../../config/redisClient';
import { prisma } from '../../../config/database';
import bcrypt from 'bcrypt';

export class UserService implements IUserService {
  private readonly cacheKey = 'users:all';

  async getAll() {
    const cached = await redisClient.get(this.cacheKey);
    if (cached) {
      console.log('Retornando usuários do cache');
      return JSON.parse(cached);
    }
    const users = await prisma.user.findMany();
    await redisClient.setEx(this.cacheKey, 60, JSON.stringify(users));
    return users;
  }

  async getById(id: string) {
    return await prisma.user.findUnique({ where: { id } });
  }

  async create(data: CreateUserDTO) {
    const hashedPassword = await bcrypt.hash(data.password, 12);
    const newUser = await prisma.user.create({
      data: { ...data, password: hashedPassword }
    });
    await redisClient.del(this.cacheKey);
    return newUser;
  }

  async update(id: string, data: Partial<CreateUserDTO>) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 12);
    }
    const updatedUser = await prisma.user.update({
      where: { id },
      data
    });
    await redisClient.del(this.cacheKey);
    return updatedUser;
  }

  async delete(id: string) {
    await prisma.user.delete({ where: { id } });
    await redisClient.del(this.cacheKey);
    return true;
  }
}

