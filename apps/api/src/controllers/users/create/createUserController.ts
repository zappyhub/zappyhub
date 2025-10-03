import type { CreateUserDTO, ErrorResponseDTO, Result, UserEntity, UserResponseDTO } from "@/interfaces/IUser";
import type { Response, Request } from 'express';
import logger from "@/services/logger/logger";
import { toUserResponse } from "@/interfaces/IUser";
import { CreateUserUseCase } from "@/usecases/users/createUserUseCase";
import { handleResult } from "@/utils/handleResult";



export class CreateUserController {
  constructor(private usecase: CreateUserUseCase) { };

  async run(req: Request, res: Response<UserResponseDTO | ErrorResponseDTO>): Promise<void> {


    const dto = req.body as CreateUserDTO
    logger.info({ dto }, "[CONTROLLER - CreateUserController]: Entrada");
    try {
      const result: Result<UserEntity> = await this.usecase.handle(dto);

      handleResult(res, result, 201, toUserResponse)
    } catch (err: unknown) {
      logger.error({ err }, "[CONTROLLER - CreateUserController]: Erro inesperado");
      res.status(500).json({ error: "Erro interno inesperado" })
    }
  }
}

//
