import type { AppError, IUserRepo, Result, UserEntity } from "@/interfaces/IUser";
import logger from "@/services/logger/logger";


export class GetUserByIdUseCase {
  constructor(private readonly repo: IUserRepo) { }

  async handle(id: string): Promise<Result<UserEntity>> {
    logger.info({ id }, "[USECASE - GetUserById]: Entrada");


    // Remover if quando implementar zod 
    if (id.trim().length === 0) {
      const error: AppError = { code: "INVALID_INPUT", message: "ID de usuário inválido" };
      logger.warn({ userId: id }, "[USECASE - GetUserById]: ID inválido");
      return { ok: false, error };
    }
    try {

      //consulta ao repo 
      const user = await this.repo.getUserById(id);
      if (!user) {
        const error: AppError = { code: "NOT_FOUND", message: "Usuário não encontrado" };
        logger.warn({ userId: id }, "[USECASE - GetUserById]: Usuário não encontrado");
        return { ok: false, error }
      }

      // Sucesso
      logger.info({ userId: user.id }, "[USECASE - GetUserById]: Sucesso");
      return { ok: true, value: user }

    } catch (err: unknown) {
      logger.error({ err }, "[USECASE - GetUserById]: Erro inesperado");
      const error: AppError = { code: "INTERNAL_ERROR", message: "Erro interno ao buscar usuário por ID" };
      return { ok: false, error }

    }
  }
}
