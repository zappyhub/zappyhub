import type { Request, Response } from "express";
import type { GetUserByIdUseCase } from "@/usecases/users/getUserByIdUseCase";
import { Result, toUserResponse, UserEntity, UserResponseDTO, ErrorResponseDTO } from "@/interfaces/IUser";
import logger from "@/services/logger/logger";
import { handleResult } from "@/utils/handleResult";
//







export class GetUserByIdController {
  constructor(private readonly usecase: GetUserByIdUseCase) { }

  async run(req: Request, res: Response<UserResponseDTO | ErrorResponseDTO>,): Promise<void> {

    const { id } = req.params as { id: string };

    logger.info({ id }, "[CONTROLLER - GetUserById]: Entrada");

    try {
      const result: Result<UserEntity> = await this.usecase.handle(id);
      handleResult(res, result, 200, toUserResponse)
    } catch (err) {
      logger.error({ err }, "[CONTROLLER - GetUserById]: Erro inesperado");
      res.status(500).json({ error: "Erro interno ao processar requisição" })
    }
  }
}
