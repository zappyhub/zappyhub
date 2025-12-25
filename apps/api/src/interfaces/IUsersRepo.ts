import { User, Prisma } from "@/services/prisma/client";

export type UserReturn = Prisma.UserGetPayload<{
  include: {
    companiesOwned: {
      select: {
        companyName: true;
        id: true;
      };
    };
    orders: {
      select: {
        id: true;
      };
    };
  };
  omit: {
    createdAt: true;
    deletedAt: true;
    updatedAt: true;
    passwordHash: true;
  };
}>;

export type CreateUserPayload = {
  userName: string;
  email?: string;
  cellphoneNumber?: string;
  password: string;
};

export type UserUpdateData = Partial<
  Omit<User, "id" | "createdAt" | "deletedAt">
>;

export interface IUsersRepo {
  create(payload: CreateUserPayload): Promise<Pick<User, "id"> | null>;
  getAll(): Promise<User[]>;
  exists(id: string): Promise<Boolean>;
  getUserById(id: string): Promise<UserReturn | null>;
  getUserByEmail(email: string): Promise<UserReturn | null>;
  getUserByCellphoneNumber(cellphoneNumber: string): Promise<UserReturn | null>;
  softDeleteUser(id: string): Promise<Pick<User, "id">>;
  hardDeleteUser(id: string): Promise<Pick<User, "id">>;
  updateUser(id: string, payload: UserUpdateData): Promise<UserReturn>;
}
