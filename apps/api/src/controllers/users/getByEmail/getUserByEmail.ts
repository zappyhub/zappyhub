import { Request, Response } from "express";
import type { UserEntity, UserResponseDTO, Result, ErrorResponseDTO, AuthUser } from "@/interfaces/IUser";
import { toUserResponse } from "@/interfaces/IUser";
import { GetUserByEmailUseCase } from "@/usecases/users/getUserByEmailUseCase";
import { handleResult } from "@/utils/handleResult";
import logger from "@/services/logger/logger";




export class GetUserByEmailController {
  constructor(private readonly usecase: GetUserByEmailUseCase) { }

  async run(req: Request & { user?: AuthUser }, res: Response<UserResponseDTO | ErrorResponseDTO>): Promise<void> {

    const email = String((req.query as { email?: string }).email || "").trim();
    const role = req.user?.role ?? "";

    logger.info({ email, role }, "[CONTROLLER - GetUserByEmail]: Entrada");

    if (!email) {
      res.status(400).json({ error: "Email é obrigatorio" })
      return
    }
    try {
      const result: Result<UserEntity> = await this.usecase.handle(email, role);
      handleResult(res, result, 200, toUserResponse)

    } catch (err: unknown) {
      logger.error({ err }, "[CONTROLLER - GetUserByEmail]: Erro inesperado")
      res.status(500).json({ error: "Erro interno ao processar requisição" })
    }
  }
}
