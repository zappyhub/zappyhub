import type { AppError, IUserRepo, Result, UserEntity } from "@/interfaces/IUser";
import logger from "@/services/logger/logger";




export class GetUserByPhoneUseCase {
  constructor(private repo: IUserRepo) { }

  async handle(cellphoneNumber: string): Promise<Result<UserEntity>> {
    logger.info({ cellphoneNumber }, "[USECASE - GetUserByPhone]: Entrada");


    // Validação ,remover if quando implementar zod 

    if (cellphoneNumber.trim().length < 8) {
      const error: AppError = { code: "INVALID_INPUT", message: "Número de telefone inválido" };
      logger.warn({ cellphoneNumber }, "[USECASE - GetUserByPhone]: Telefone inválido");
      return { ok: false, error }
    }
    try {
      //Consulta
      const user = await this.repo.getUserByPhone(cellphoneNumber);

      if (!user) {
        const error: AppError = { code: "NOT_FOUND", message: "Usuário não encontrado" };
        logger.warn({ cellphoneNumber }, "[USECASE - GetUserByPhone]: Usuário não encontrado");
        return { ok: false, error };
      }
      // Sucesso
      logger.info({ userId: user.id }, "[USECASE - GetUserByPhone]: Sucesso");
      return { ok: true, value: user }
    } catch (err: unknown) {
      logger.error({ err, cellphoneNumber }, "[USECASE - GetUserByPhone]: Erro inesperado");
      const error: AppError = { code: "INTERNAL_ERROR", message: "Erro interno ao buscar usuário por telefone" };
      return { ok: false, error }
    }
  }
}
