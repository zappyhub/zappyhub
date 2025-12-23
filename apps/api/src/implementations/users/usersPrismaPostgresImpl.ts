import {
  CreateUserPayload,
  IUsersRepo,
  UserReturn,
  UserUpdateData,
} from "@/interfaces/IUsersRepo";
import { prisma } from "@/infra/prisma";
import { User } from "@/services/prisma";
import * as bcrypt from "bcrypt";
import { decrypt, encrypt } from "@/services/common/crypto";
import { isPrismaKnownRequestError } from "@/utils/prisma";

/*
Falta:

 - LOGS
 - Paginação
 - Errors

*/

export class UserPrismaPostgresImpl implements IUsersRepo {
  client = prisma.user;

  async create(payload: CreateUserPayload): Promise<Pick<User, "id"> | null> {
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

      return userId;
    } catch (error) {
      return null;
    }
  }
  //Later: Pagination
  async getAll(): Promise<User[]> {
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
    return (await this.client.findFirst({
      where: {
        id,
      },
    }))
      ? true
      : false;
  }

  async getUserById(id: string): Promise<UserReturn | null> {
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
      return this.decryptUser(user) as UserReturn;
    } catch (error) {
      if (isPrismaKnownRequestError(error) && error.code === "P2025") {
      }

      return null;
    }
  }

  async getUserByCellphoneNumber(
    cellphoneNumber: string
  ): Promise<UserReturn | null> {
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
      return this.decryptUser(user) as UserReturn;
    } catch (error) {
      if (isPrismaKnownRequestError(error) && error.code === "P2025") {
      }

      return null;
    }
  }

  async getUserByEmail(email: string): Promise<UserReturn | null> {
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
      return this.decryptUser(user) as UserReturn;
    } catch (error) {
      if (isPrismaKnownRequestError(error) && error.code === "P2025") {
      }

      return null;
    }
  }

  async softDeleteUser(id: string): Promise<Pick<User, "id">> {
    const softDeletedUser = await this.client.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });

    return softDeletedUser;
  }

  async hardDeleteUser(id: string): Promise<Pick<User, "id">> {
    const deletedUser = await this.client.delete({
      where: {
        id,
      },
      select: {
        id: true,
      },
    });

    return deletedUser;
  }
  //Lidar com a criptografia dessa função
  async updateUser(id: string, payload: UserUpdateData): Promise<UserReturn> {
    try {
      const updatedUser = await this.client.update({
        where: {
          id,
        },
        data: {
          ...payload,
        },
      });

      return updatedUser as unknown as UserReturn;
    } catch (error) {
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
