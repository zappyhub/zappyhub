import type { AppError, IUserRepo, Result, UserEntity } from "@/interfaces/IUser";
import logger from "@/services/logger/logger";


export class GetUserByNameUseCase {
  constructor(private readonly repo: IUserRepo) { }

  async handle(userName: string): Promise<Result<UserEntity>> {
    logger.info({ userName }, "[USECASE - GetUserByName]: Entrada");


    // Validação ,remover if quando implementar zod 

    if ( userName.trim().length === 0) {
      const error: AppError = { code: "INVALID_INPUT", message: "Nome de usuário inválido" };
      logger.warn({ userName }, "[USECASE - GetUserByName]:Nome inválido ");
      return { ok: false, error }
    }
    try {
      //Consulta 
      const user = await this.repo.getUserByName(userName);
      if (!user) {
        const error: AppError = { code: "NOT_FOUND", message: "Usuário não encontrado" };
        logger.warn({ userName }, "[USECASE - GetUserByName]: Usuário não encontrado");
        return { ok: false, error };
      }
      //Sucesso 
      logger.info({ userId: user.id }, "[USECASE - GetUserByName]: Sucesso");
      return { ok: true, value: user }

    } catch (err: unknown) {
      logger.error({ err }, "[USECASE - GetUserByName]: Erro inesperado");
      const error: AppError = { code: "INTERNAL_ERROR", message: "Erro interno ao buscar usuário por nome" }
      return { ok: false, error }
    }
  }
}
