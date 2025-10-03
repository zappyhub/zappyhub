
import { Result } from "@/interfaces/IUser";
import type { AppError, AuthUser, DeletedUserDTO, IUserRepo } from "@/interfaces/IUser";
import logger from "@/services/logger/logger";
import { canDeleteUser } from "@/utils/authorization";


export class DeleteUserUseCase {
  constructor(private repo: IUserRepo) { }

  async handle(id: string, currentUser: AuthUser): Promise<Result<DeletedUserDTO>> {

    logger.info({ id, currentUserId: currentUser.id, role: currentUser.role }, "[USECASE - DeleteUser]: Entrada");

    try {
      // Validação, ao  implementar zod pode remover esse if de validação 
      if (id.trim().length === 0) {
        const error: AppError = { code: "INVALID_INPUT", message: "ID de usuário inválido" }
        logger.warn({ userId: id }, "[USECASE - DeleteUser]: ID inválido");
        return { ok: false, error }
      }
      // È admin?  ao  implementar zod pode remover esse if de validação 
      if (!canDeleteUser(currentUser, id)) {
        const error: AppError = { code: "FORBIDDEN", message: "Ação não permitida" }
        logger.warn({ userId: id, currentUserId: currentUser.role }, "[USECASE - DeleteUser]: Permissão negada");
        return { ok: false, error }
      }


      // Usuário existe?
      const existing = await this.repo.getUserById(id);
      if (!existing) {
        const error: AppError = { code: "NOT_FOUND", message: "Usuário não encontrado" }
        logger.warn({ userId: id }, "[USECASE - DeleteUser]: Usuário não encontrado");
        return { ok: false, error }

      }
      //Deletando
      await this.repo.deleteUser(id);
      logger.info({ userId: id, }, "[USECASE - DeleteUser]: Sucesso");
      return { ok: true, value: { id: existing.id, name: existing.name, message: "Usuário deletado" } };


    } catch (err: unknown) {
      logger.error({ err }, "[USECASE - deleteUser]: Erro inesperado");
      const error: AppError = { code: "INTERNAL_ERROR", message: "Erro interno ao deletar usuário" };
      return { ok: false, error }
    }
  }
}
