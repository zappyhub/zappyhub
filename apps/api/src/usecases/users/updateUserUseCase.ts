

import type { UserEntity, UpdateUserDTO, Result, AppError, AuthUser } from "@/interfaces/IUser";
import type { IUserRepo } from "@/interfaces/IUser";
import logger from "@/services/logger/logger";
import { canUpdateUser } from "@/utils/authorization";




export class UpdateUserUseCase {
  constructor(private readonly repo: IUserRepo) { }

  async handle(id: string, patch: UpdateUserDTO, currentUser: AuthUser): Promise<Result<UserEntity>> {
    logger.info({ userId: id, patch }, "[USECASE - UpdateUser]: Entrada");


    // Validação  
    if (id.trim().length === 0) {
      const error: AppError = { code: "INVALID_INPUT", message: "ID de usuário inválido" };
      logger.warn({ userId: id }, "[USECASE - UpdateUser]: ID inválido");
      return { ok: false, error }
    }

    // Aki impede usuário de alterar a role pra admin
    if (!canUpdateUser(currentUser, id)) {
      const error: AppError = { code: "FORBIDDEN", message: "Usuário não tem permissão para editar esse registro" };
      logger.warn({ currentUserId: currentUser.id, role: currentUser.role }, "[USECASE - UpdateUser]: Permissão negada");
      return { ok: false, error }
    }
    // Aki impede se usuário tentar modificar outro usuário 
    if (patch.role !== undefined && currentUser.role !== "ADMIN") {
      const error: AppError = { code: "FORBIDDEN", message: "Usuário não tem permissão para alterar role" };
      logger.warn({ attemptedRole: patch.role }, "[USECASE - UpdateUser]: Tentativa de alterar role negada");
      return { ok: false, error }
    }
    // Fim das checagens


    try {
      // Usuário existe
      const existing = await this.repo.getUserById(id);
      if (!existing) {
        const error: AppError = { code: "NOT_FOUND", message: "Usuário não encontrado" };
        logger.warn({ id }, "[USECASE - UpdateUser]: Usuário não encontrado");
        return { ok: false, error }
      }

      //Unicidade

      const conflict = await this.checkConflicts(patch, existing);
      if (conflict) {
        logger.warn({ conflict }, "[USECASE - UpdateUser]: Conflito");
        return { ok: false, error: conflict }

      }

      // Atualizar usuário
      const updated = await this.repo.updateUser(id, patch);
      logger.info({ userId: updated.id }, "[USECASE - UpdateUser]: Sucesso");
      return { ok: true, value: updated }

    } catch (err: unknown) {
      logger.error({ err }, "[USECASE - UpdateUser]: Erro inesperado");
      const error: AppError = { code: "INTERNAL_ERROR", message: "Erro interno ao atualizar usuário" };
      return { ok: false, error }

    }
  }
  private async checkConflicts(patch: UpdateUserDTO, existing: UserEntity): Promise<AppError | null> {
    if (patch.email && patch.email !== existing.email) {
      if (await this.repo.getUserByEmail(patch.email)) {
        return { code: "EMAIL_CONFLICT", message: "Email já em uso" };
      }
    }
    if (patch.userName && patch.userName !== existing.userName) {
      if (await this.repo.getUserByName(patch.userName)) {
        return { code: "USERNAME_CONFLICT", message: "Nome de usuário já em uso" };
      }
    }
    if (patch.cellphoneNumber && patch.cellphoneNumber !== existing.cellphoneNumber) {
      if (await this.repo.getUserByPhone(patch.cellphoneNumber)) {
        return { code: "PHONE_CONFLICT", message: "Telefone já em uso" };
      }
    }
    return null;
  }
}


