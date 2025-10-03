import { AuthTokens, IAuthService, LoginDTO } from "@/interfaces/IAuth";
import { Request, Response } from "express";
import { handleResult } from "@/utils/handleResult";
import type { Result } from "@/interfaces/IUser";



export class LoginController {
  constructor(private loginUseCase: IAuthService) { }

  async run(req: Request, res: Response<AuthTokens | { error: string }>) {
    const dto = req.body as LoginDTO;

    let result: Result<AuthTokens>;

    try {
      const tokens = await this.loginUseCase.authenticate(dto);
      result = { ok: true, value: tokens }

    } catch (err: unknown) {
      result = { ok: false, error: { code: "UNAUTHORIZED", message: "Não autorizado" } }
    }
    handleResult(res, result, 200, (tkns) => tkns)
  }
}
