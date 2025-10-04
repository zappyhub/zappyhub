
import type { AppError, AuthUser, IUserRepo, Result } from "@/interfaces/IUser";
import type { UserEntity } from "@/interfaces/IUser";
import logger from "@/services/logger/logger";
import { canGetAllUsers } from "@/utils/authorization";



export class GetAllUsersUseCase {
  constructor(private readonly repo: IUserRepo) { }

  async handle(currentUser: AuthUser): Promise<Result<UserEntity[]>> {

    logger.info({ currentUserId: currentUser.id, role: currentUser.role },
      "[USECASE - GetAllUsersUseCase]: Entrada");

    // Validação, ao  implementar zod pode remover esse if de validação 
    if (!canGetAllUsers(currentUser)) {

      const error: AppError = { code: "FORBIDDEN", message: "Ação não permitido" };
      logger.warn({ currentUserId: currentUser.id, role: currentUser.role }, "[USECASE - GetAllUsers]: Apenas admin podem listar todos os usuários");
      return { ok: false, error }
    }

    try {
      const users = await this.repo.getAllUsers();

      logger.info({ count: users.length }, "[USECASE - GetAllUsers]: Sucesso");
      return { ok: true, value: users  }

    } catch (err: unknown) {
      logger.warn({ err }, "[USECASE - GetAllUsers]: Erro inesperado");
      const error: AppError = { code: "INTERNAL_ERROR", message: "Erro interno  ao buscar usuários" };
      return { ok: false, error }
    }
  }
}
