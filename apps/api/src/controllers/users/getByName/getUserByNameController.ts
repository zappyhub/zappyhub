import { ErrorResponseDTO, Result, toUserResponse, UserEntity, UserResponseDTO } from "@/interfaces/IUser";
import logger from "@/services/logger/logger";
import { GetUserByNameUseCase } from "@/usecases/users/getUserByNameUseCase";
import { Request, Response } from "express";
import { handleResult } from "@/utils/handleResult";
//


export class GetUserByNameController {
  constructor(private usecase: GetUserByNameUseCase) { }

  async run(req: Request, res: Response<UserResponseDTO | ErrorResponseDTO>): Promise<void> {


    const userName = String((req.query as { userName?: string }).userName || "").trim();

    logger.info({ userName }, "[CONTROLLER - GetUserByName]: Entrada");

    if (!userName) {
      res.status(400).json({ error: "Nome do usuário é obrigatorio" })
    }
    try {
      const result: Result<UserEntity> = await this.usecase.handle(userName);

      handleResult(res, result, 200, toUserResponse)
    } catch (err: unknown) {
      logger.error({ err }, "[CONTROLLER - GetUserByName]: Erro inesperado");
      res.status(500).json({ error: "Erro interno inesperado" })
    }
  }
}
