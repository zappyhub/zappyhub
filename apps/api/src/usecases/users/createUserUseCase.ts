import type {
  AppError,
  CreateUserDTO,
  IUserRepo,
  Result,
  UserEntity
} from "@/interfaces/IUser";
import logger from "@/services/logger/logger";
import { isAppError } from "@/utils/isAppError";






export class CreateUserUseCase {
  constructor(private readonly repo: IUserRepo) { }

  async handle(data: CreateUserDTO): Promise<Result<UserEntity>> {
    logger.info({ userName: data.userName, email: data.email }, "[USECASE - CreateUser]: Entrada");

    //Validação simples quando implementar zod pode ser removido

    const missing: string[] = [];
    if (!data.name?.trim()) missing.push("name");
    if (!data.userName?.trim()) missing.push("userName");
    if (!data.email?.trim()) missing.push("email");
    if (!data.password?.trim()) missing.push("password");

    if (missing.length) {
      const error: AppError = {
        code: "INVALID_INPUT",
        message: `Campos obrigatórios ausentes: ${missing.join(", ")}`,
      };
      logger.warn({ missing }, "[USECASE - createUser]: Dados inválidos");
      return { ok: false, error };
    }


    // Verificar conflitos 

    const conflict = await this.checkConflicts(data);
    if (conflict) {
      logger.warn({ conflict }, "[USECASE - createUser]: Conflito de dados");
      return { ok: false, error: conflict };
    }





    try {
      // Criação de usuário 
      const entity = await this.repo.createUser(data);
      logger.info({ userId: entity.id }, "[USECASE - CreateUser]:Sucesso ");
      return { ok: true, value: entity };

    } catch (err) {
      logger.error({ err }, "[USECASE - CreateUser]:Erro inesperado");
      if (isAppError(err)) {
        return { ok: false, error: err }
      }
      const error: AppError = { code: "INTERNAL_ERROR", message: "Falha ao criar usuário" };
      return { ok: false, error }
    }
  }

  private async checkConflicts(data: CreateUserDTO): Promise<AppError | null> {
    if (await this.repo.getUserByEmail(data.email)) {
      return { code: "EMAIL_CONFLICT", message: "Email já em uso" }
    }
    if (await this.repo.getUserByName(data.userName)) {
      return { code: "USERNAME_CONFLICT", message: "Nome de usuário já em uso" }
    }
    if (data.cellphoneNumber && await this.repo.getUserByPhone(data.cellphoneNumber)) {
      return { code: "PHONE_CONFLICT", message: "Número de telefone já em uso" }
    }
    return null;
  }
}



