import { UserEntity } from "./IUser";

export interface LoginDTO {
  email: string;
  password: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
}

export interface IAuthService {
  authenticate(dto: LoginDTO): Promise<AuthTokens>;
}

export interface IUserRepo {
  getUserByEmail(email: string): Promise<UserEntity | undefined>;
}

export interface IHashService {
  hash(password: string): Promise<string>;
  verify(password: string, hash: string): Promise<boolean>;
}

export interface ITokenProvider {
  sign(payload: object): string;
}
