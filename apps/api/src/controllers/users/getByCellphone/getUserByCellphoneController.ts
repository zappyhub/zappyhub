import { ErrorResponseDTO, Result, toUserResponse, UserEntity, UserResponseDTO } from "@/interfaces/IUser";
import logger from "@/services/logger/logger";
import { GetUserByPhoneUseCase } from "@/usecases/users/getUserByPhoneUseCase";
import { handleResult } from "@/utils/handleResult";
import { Request, Response } from "express";
//





export class GetUserByPhoneController {
  constructor(private readonly usecase: GetUserByPhoneUseCase) { }

  async run(req: Request, res: Response<UserResponseDTO | ErrorResponseDTO>): Promise<void> {

    const phone = String((req.query as { phone?: string }).phone || "").trim();

    logger.info({ phone }, "[CONTROLLER - GetUserByPhone]: Entrada");

    if (!phone) {
      res.status(400).json({ error: "Parâmetro 'phone' é obrigatório" });
      return
    }
    try {
      const result: Result<UserEntity> = await this.usecase.handle(phone);
      handleResult(res, result, 200, toUserResponse);
    } catch (err) {
      logger.error({ err }, "[CONTROLLER - GetUserByPhone]: Erro inesperado");
    }
  }
}
