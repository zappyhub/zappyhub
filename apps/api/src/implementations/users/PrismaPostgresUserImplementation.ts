import {
  CreateUserPayload,
  IUsersRepo,
  UserReturn,
  UserUpdateData,
} from "@/interfaces/IUsersRepo";
import { prisma } from "@/infra/prisma";
import { Prisma, User } from "@/services/prisma/client";
import * as bcrypt from "bcrypt";
import { decrypt, encrypt } from "@/services/common/crypto";
import { isPrismaKnownRequestError } from "@/utils/prisma";
import logger from "@/services/logger/logger";

const userScope = {
  include: {
    companiesOwned: {
      select: {
        companyName: true,
        id: true,
      },
    },
    orders: {
      select: {
        id: true,
      },
    },
  },
  omit: {
    createdAt: true,
    deletedAt: true,
    updatedAt: true,
    passwordHash: true,
  },
} satisfies Prisma.UserFindManyArgs;

export class PrismaPostgresUserImplementation implements IUsersRepo {
  private client = prisma.user;
  private readonly LOG_CONTEXT = "[UserRepo]";

  async create(payload: CreateUserPayload): Promise<Pick<User, "id"> | null> {
    logger.info(`${this.LOG_CONTEXT} Creating new user.`);

    try {
      const user = await this.client.create({
        data: {
          userName: payload.userName,
          email: payload.email ? encrypt(payload.email) : null,
          cellphoneNumber: payload.cellphoneNumber
            ? encrypt(payload.cellphoneNumber)
            : null,
          passwordHash: bcrypt.hashSync(payload.password, 12),
        },
        select: { id: true },
      });

      logger.info(
        `${this.LOG_CONTEXT} User created successfully (ID: ${user.id}).`
      );
      return user;
    } catch (error) {
      logger.error(
        `${this.LOG_CONTEXT} Create failed: ${(error as Error).message}`
      );
      throw error;
    }
  }

  async getAll({ cursor, limit = 10 }: { cursor?: string; limit?: number }) {
    const users = await this.client.findMany({
      where: { deletedAt: null },
      ...userScope,
      orderBy: { createdAt: "asc" },
      take: limit + 1,
      ...(cursor && { cursor: { id: cursor }, skip: 1 }),
    });

    const hasNextPage = users.length > limit;
    const items = hasNextPage ? users.slice(0, -1) : users;

    const decryptedUsers = items.map((u) => this.mapToDomain(u));

    return {
      data: decryptedUsers,
      nextCursor: hasNextPage
        ? decryptedUsers[decryptedUsers.length - 1].id
        : null,
    };
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.client.count({ where: { id } });
    return count > 0;
  }

  async getUserById(id: string): Promise<UserReturn | null> {
    return this.findUniqueUser({ id }, "ID");
  }

  async getUserByEmail(email: string): Promise<UserReturn | null> {
    const encryptedEmail = encrypt(email);
    return this.findUniqueUser({ email: encryptedEmail }, "Email");
  }

  async getUserByCellphoneNumber(phone: string): Promise<UserReturn | null> {
    const encryptedPhone = encrypt(phone);
    return this.findUniqueUser(
      { cellphoneNumber: encryptedPhone },
      "Cellphone"
    );
  }

  private async findUniqueUser(
    where: Prisma.UserWhereUniqueInput,
    searchType: string
  ): Promise<UserReturn | null> {
    try {
      const user = await this.client.findUnique({
        where,
        ...userScope,
      });

      if (!user) {
        logger.warn(`${this.LOG_CONTEXT} User not found by ${searchType}.`);
        return null;
      }

      return this.mapToDomain(user);
    } catch (error) {
      logger.error(
        `${this.LOG_CONTEXT} Error finding by ${searchType}: ${(error as Error).message}`
      );
      throw error;
    }
  }

  async softDeleteUser(id: string): Promise<Pick<User, "id">> {
    return this.client.update({
      where: { id },
      data: { deletedAt: new Date() },
      select: { id: true },
    });
  }

  async hardDeleteUser(id: string): Promise<Pick<User, "id">> {
    return this.client.delete({
      where: { id },
      select: { id: true },
    });
  }

  async updateUser(id: string, payload: UserUpdateData): Promise<UserReturn> {
    logger.info(`${this.LOG_CONTEXT} Updating user ID: ${id}`);

    const { passwordHash, ...rest } = payload as any;

    const dataToUpdate: Prisma.UserUpdateInput = {
      ...rest,
      ...(payload.email && { email: encrypt(payload.email) }),
      ...(payload.cellphoneNumber && {
        cellphoneNumber: encrypt(payload.cellphoneNumber),
      }),
      ...(passwordHash && { passwordHash: bcrypt.hashSync(passwordHash, 12) }),
    };

    try {
      const updatedUser = await this.client.update({
        where: { id },
        data: dataToUpdate,
        ...userScope,
      });

      return this.mapToDomain(updatedUser);
    } catch (error) {
      if (isPrismaKnownRequestError(error) && error.code === "P2025") {
        throw new Error("User not found!");
      }
      throw error;
    }
  }

  private mapToDomain(user: any): UserReturn {
    // Decriptografia segura
    return {
      ...user,
      email: user.email ? decrypt(user.email) : null,
      cellphoneNumber: user.cellphoneNumber
        ? decrypt(user.cellphoneNumber)
        : null,
    };
  }
}
