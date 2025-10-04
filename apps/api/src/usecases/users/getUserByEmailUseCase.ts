import type { AppError, IUserRepo, Result, UserEntity } from "@/interfaces/IUser";
import logger from "@/services/logger/logger";





export class GetUserByEmailUseCase {
  constructor(private repo: IUserRepo) { }

  async handle(email: string, currentUserRole: string): Promise<Result<UserEntity>> {
    logger.info({ email, role: currentUserRole }, "[USECASE - GetUserByEmail]: Entrada");



    if (!email || email.trim().length === 0 || !email.includes("@")) {
      const error: AppError = { code: "INVALID_INPUT", message: "E-mail fornecido é inválido" };
      logger.warn({ email }, "[USECASE - GetUserByEmail]: Email inválido");
      return { ok: false, error };
    }
    try {

      const user = await this.repo.getUserByEmail(email);

      if (!user) {
        const error: AppError = { code: "NOT_FOUND", message: "Usuário não encontrado" };
        logger.warn({ email }, "[USECASE - GetUserByEmail]: Usuário não encontrado");
        return { ok: false, error };
      }

      // Sucesso
      logger.info({ userId: user.id }, "[USECASE - GetUserByEmail]: Sucesso");
      return { ok: true, value: user };

    } catch (err: unknown) {
      logger.error({ err }, "[USECASE - GetUserByEmail]: Erro inesperado");
      const error: AppError = {
        code: "INTERNAL_ERROR",
        message: "Erro interno ao buscar usuário por e-email"
      };
      return { ok: false, error }
    }
  }
}












