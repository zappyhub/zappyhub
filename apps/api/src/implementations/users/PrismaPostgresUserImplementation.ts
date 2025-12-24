import {
  CreateUserPayload,
  IUsersRepo,
  UserReturn,
  UserUpdateData,
} from "@/interfaces/IUsersRepo";
import { prisma } from "@/infra/prisma";
import { User } from "@/services/prisma/client";
import * as bcrypt from "bcrypt";
import { decrypt, encrypt } from "@/services/common/crypto";
import { isPrismaKnownRequestError } from "@/utils/prisma";
import logger from "@/services/logger/logger";

/*
Falta:

 - LOGS
 - Paginação
 - Errors

*/

export class PrismaPostgresUserImplementation implements IUsersRepo {
  client = prisma.user;

  async create(payload: CreateUserPayload): Promise<Pick<User, "id"> | null> {
    logger.info(
      `[USER DOMAIN -  usersPrismaPostgresImpl]: Server issued to create a new user`
    );
    logger.info(
      `[USER DOMAIN -  usersPrismaPostgresImpl]: Data received: ${payload}`
    );
    try {
      const userId = await this.client.create({
        data: {
          userName: payload.userName,
          email: payload.email ? encrypt(payload.email) : null,
          cellphoneNumber: payload.cellphoneNumber
            ? encrypt(payload.cellphoneNumber)
            : null,
          passwordHash: bcrypt.hashSync(payload.password, 12),
        },
        select: {
          id: true,
        },
      });
      logger.info(
        `[USER DOMAIN -  usersPrismaPostgresImpl]: Successfully created a new user!`
      );
      return userId;
    } catch (error) {
      logger.error(
        `[USER DOMAIN -  usersPrismaPostgresImpl]: Something went wrong. User not created`
      );
      return null;
    }
  }
  //Later: Pagination
  async getAll(): Promise<User[]> {
    logger.info(
      `[USER DOMAIN -  usersPrismaPostgresImpl]: Server issued to get all users, sending it`
    );
    const users = await this.client.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return users.map((user) => this.decryptUser(user)) as User[];
  }

  async exists(id: string): Promise<Boolean> {
    logger.info(
      `[USER DOMAIN -  usersPrismaPostgresImpl]: Server issued to verify user existence in DB, sending it`
    );
    return (await this.client.findFirst({
      where: {
        id,
      },
    }))
      ? true
      : false;
  }

  async getUserById(id: string): Promise<UserReturn | null> {
    logger.info(
      `[USER DOMAIN -  usersPrismaPostgresImpl]: Server issued to get user by id`
    );
    logger.info(`[USER DOMAIN -  usersPrismaPostgresImpl]: id received: ${id}`);
    try {
      const user = await this.client.findUniqueOrThrow({
        where: {
          id,
        },
        include: {
          companiesOwned: {
            select: {
              id: true,
              companyName: true,
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
      });
      logger.info(
        `[USER DOMAIN -  usersPrismaPostgresImpl]: User found! Decrypting and sending it`
      );
      return this.decryptUser(user) as UserReturn;
    } catch (error) {
      if (isPrismaKnownRequestError(error) && error.code === "P2025") {
      }
      logger.error(
        `[USER DOMAIN -  usersPrismaPostgresImpl]: Somenthing went wrong!`
      );
      return null;
    }
  }

  async getUserByCellphoneNumber(
    cellphoneNumber: string
  ): Promise<UserReturn | null> {
    logger.info(
      `[USER DOMAIN -  usersPrismaPostgresImpl]: Server issued to get user by cellphone number`
    );
    logger.info(
      `[USER DOMAIN -  usersPrismaPostgresImpl]: cellphone number received: ${cellphoneNumber}`
    );
    try {
      const user = await this.client.findUniqueOrThrow({
        where: {
          cellphoneNumber,
        },
        include: {
          companiesOwned: {
            select: {
              id: true,
              companyName: true,
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
      });
      logger.info(
        `[USER DOMAIN -  usersPrismaPostgresImpl]: User found! Decrypting and sending it`
      );

      return this.decryptUser(user) as UserReturn;
    } catch (error) {
      if (isPrismaKnownRequestError(error) && error.code === "P2025") {
      }
      logger.error(
        `[USER DOMAIN -  usersPrismaPostgresImpl]: Somenthing went wrong!`
      );

      return null;
    }
  }

  async getUserByEmail(email: string): Promise<UserReturn | null> {
    logger.info(
      `[USER DOMAIN -  usersPrismaPostgresImpl]: Server issued to get user by cellphone email`
    );
    logger.info(
      `[USER DOMAIN -  usersPrismaPostgresImpl]: cellphone number received: ${email}`
    );
    try {
      const user = await this.client.findUniqueOrThrow({
        where: {
          email,
        },
        include: {
          companiesOwned: {
            select: {
              id: true,
              companyName: true,
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
      });
      logger.info(
        `[USER DOMAIN -  usersPrismaPostgresImpl]: User found! Decrypting and sending it`
      );

      return this.decryptUser(user) as UserReturn;
    } catch (error) {
      if (isPrismaKnownRequestError(error) && error.code === "P2025") {
      }
      logger.error(
        `[USER DOMAIN -  usersPrismaPostgresImpl]: Somenthing went wrong!`
      );

      return null;
    }
  }

  async softDeleteUser(id: string): Promise<Pick<User, "id">> {
    logger.info(
      `[USER DOMAIN -  usersPrismaPostgresImpl]: Server issued to soft delete user`
    );
    logger.info(
      `[USER DOMAIN -  usersPrismaPostgresImpl]: User id received: ${id}`
    );
    const softDeletedUser = await this.client.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });

    logger.info(`[USER DOMAIN -  usersPrismaPostgresImpl]: User soft deleted!`);

    return softDeletedUser;
  }

  async hardDeleteUser(id: string): Promise<Pick<User, "id">> {
    logger.info(
      `[USER DOMAIN -  usersPrismaPostgresImpl]: Server issued to hard delete user`
    );
    logger.info(
      `[USER DOMAIN -  usersPrismaPostgresImpl]: User id received: ${id}`
    );
    const deletedUser = await this.client.delete({
      where: {
        id,
      },
      select: {
        id: true,
      },
    });
    logger.info(`[USER DOMAIN -  usersPrismaPostgresImpl]: User hard deleted!`);

    return deletedUser;
  }
  //Lidar com a criptografia dessa função e hahs do psw
  async updateUser(id: string, payload: UserUpdateData): Promise<UserReturn> {
    logger.info(
      `[USER DOMAIN -  usersPrismaPostgresImpl]: Server issued to update user`
    );
    logger.info(`[USER DOMAIN -  usersPrismaPostgresImpl]: User ID: ${id}`);
    logger.info(
      `[USER DOMAIN -  usersPrismaPostgresImpl]: Payload: ${payload}`
    );

    try {
      const updatedUser = await this.client.update({
        where: {
          id,
        },
        data: {
          ...payload,
        },
      });
      logger.info(
        `[USER DOMAIN -  usersPrismaPostgresImpl]: User updated! Sending it!`
      );
      return updatedUser as unknown as UserReturn;
    } catch (error) {
      logger.error(
        `[USER DOMAIN -  usersPrismaPostgresImpl]: Something went wrong!`
      );
      throw error;
    }
  }

  private decryptUser(user: User | UserReturn): User | UserReturn {
    return {
      ...user,
      email: user.email ? decrypt(user.email) : null,
      cellphoneNumber: user.cellphoneNumber
        ? decrypt(user.cellphoneNumber)
        : null,
    };
  }
}
