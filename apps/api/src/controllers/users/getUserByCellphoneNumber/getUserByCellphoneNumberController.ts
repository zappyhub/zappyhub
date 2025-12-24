import { Request, Response } from "express";
import { GetUserByCellphoneNumberUseCase } from "@/usecases/users/getUserByCellphoneNumberUseCase";
import logger from "@/services/logger/logger";

class GetUserByCellphoneNumberController {
  constructor(private useCase: GetUserByCellphoneNumberUseCase) {}

  async run(request: Request, response: Response) {
    const { cellphoneNumber } = request.query;

    if (!cellphoneNumber) {
      return response
        .status(400)
        .send({ message: "Cellphone number is missing" });
    }

    try {
      return response.send(
        await this.useCase.handle(cellphoneNumber.toString())
      );
    } catch (error) {
      throw error;
    }
  }
}

export { GetUserByCellphoneNumberController };
