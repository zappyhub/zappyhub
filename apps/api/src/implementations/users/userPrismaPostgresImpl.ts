import { IUserRepo, CreateUserDTO, UserEntity, UpdateUserDTO } from "@/interfaces/IUser";
import { decrypt, encrypt } from "@/services/common/crypto2";
import { hashPassword } from "@/services/common/hash";
import logger from "@/services/logger/logger";
import { PrismaClientKnownRequestError } from "@/services/prisma/runtime/library";
import { PrismaClient } from "@/services/prisma";
import { User } from "@/services/prisma";

const prisma = new PrismaClient();


export default class PrismaPostgresUserImpl implements IUserRepo {
  private mapRowToEntity(row: User): UserEntity {
    return {
      id: row.id,
      name: row.name,
      userName: row.userName,
      email: decrypt(row.email),
      cellphoneNumber: decrypt(row.cellphoneNumber),
      passwordHash: row.passwordHash,
      role: row.role as "ADMIN" | "USER",
      active: row.active,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
      deletedAt: row.deletedAt,
    }
  }

  // CREATE 
  async createUser(data: CreateUserDTO): Promise<UserEntity> {
    logger.info({ userName: data.userName }, "[REPO- CreateUser]: Entrada");

    const passwordHash = await hashPassword(data.password);
    const emailEncrypted = encrypt(data.email);
    const phoneEncrypted = encrypt(data.cellphoneNumber);

    try {
      const row = await prisma.user.create({
        data: {
          name: data.name,
          userName: data.userName,
          email: emailEncrypted,
          cellphoneNumber: phoneEncrypted,
          passwordHash,
          role: data.role ?? "USER",
          active: true,
        }
      });

      logger.info({ userId: row.id }, "[REPO - CreateUser]:Sucesso");
      return this.mapRowToEntity(row);
    } catch (err: unknown) {
      if (err instanceof PrismaClientKnownRequestError && err.code === "P2002") {
        logger.error({ code: err.code, meta: err.meta }, "[REPO - CreateUser]:  Unique violation");
        throw { code: "USER_ALREADY_EXISTS", message: "Usuário já existe" };
      }
      logger.error({ err }, "[REPO - CreateUser]:  Erro inesperado");
      throw { code: "INTERNAL_ERROR", message: "Erro ao criar usuário" };
    }
  }


  // GET ALL
  async getAllUsers(): Promise<UserEntity[]> {
    const rows: User[] = await prisma.user.findMany({ where: { deletedAt: null } });
    return rows.map((r) => this.mapRowToEntity(r));
  }

  // GET BY ID 
  async getUserById(id: string): Promise<UserEntity | undefined> {
    const row = await prisma.user.findUnique({ where: { id } });
    if (!row || row.deletedAt) return undefined;
    return this.mapRowToEntity(row);
  }

  // GET BY EMAIL 
  async getUserByEmail(email: string): Promise<UserEntity | undefined> {
    const encrypted = encrypt(email);
    const row = await prisma.user.findUnique({ where: { email: encrypted } });
    if (!row || row.deletedAt) return undefined;
    return this.mapRowToEntity(row);
  }

  // GET BY NAME 

  async getUserByName(userName: string): Promise<UserEntity | undefined> {
    const row = await prisma.user.findFirst({ where: { userName } });
    return row && !row.deletedAt ? this.mapRowToEntity(row) : undefined;
  }

  // GET BY PHONE 
  async getUserByPhone(phone: string): Promise<UserEntity | undefined> {
    const encrypted = encrypt(phone);
    const row = await prisma.user.findUnique({ where: { cellphoneNumber: encrypted } });
    if (!row || row.deletedAt) return undefined;
    return this.mapRowToEntity(row);
  }

  // UPDATE 
  async updateUser(id: string, data: UpdateUserDTO): Promise<UserEntity> {
    logger.info({ userId: id }, "[REPO - updateUser]: Entrada");

    const patchData: Record<string, unknown> = {};

    if (data.name !== undefined) patchData.name = data.name;
    if (data.userName !== undefined) patchData.userName = data.userName;
    if (data.role !== undefined) patchData.role = data.role;
    if (data.email !== undefined) patchData.email = encrypt(data.email);
    if (data.cellphoneNumber !== undefined) patchData.cellphoneNumber = encrypt(data.cellphoneNumber);
    if (data.password !== undefined) patchData.passwordHash = hashPassword(data.password);
    try {
      const row = await prisma.user.update({ where: { id }, data: patchData });
      logger.info({ userId: id }, "[REPO - updateUser]: Sucesso");
      return this.mapRowToEntity(row)
    } catch (err: unknown) {
      if (err instanceof PrismaClientKnownRequestError && err.code === "P2002") {
        logger.error({ code: err.code, meta: err.meta }, "[REPO - updateUser]: Unique Violation");
        throw { code: "INDENTIFIER_CONFLICT", message: "Conflito de identificador" };
      }
      logger.error({ err }, "[REPO - updateUser]: Erro inesperado");
      throw { code: "INTERNAL_ERROR", message: "Erro ao atualizar usuário" }
    }
  }
  async deleteUser(id: string): Promise<void> {
    try {
      await prisma.user.update({
        where: { id },
        data: {
          deletedAt: new Date(),
        }
      });
    } catch (err: unknown) {
      if (err instanceof PrismaClientKnownRequestError && err.code === "P2025") {
        throw { code: "NOT_FOUND", message: "Usuário não encontrado" }
      }
      throw { code: "INTERNAL_ERROR", message: "Erro ao deletar usuário " }
    }
  }
}
