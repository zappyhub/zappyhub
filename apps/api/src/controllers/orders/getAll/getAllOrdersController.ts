import { Request, Response } from "express";
import { getAllOrderUsecase } from "@/usecases/orders/getAllOrderUsecase";

class GetAllOrdersController {
  constructor(private useCase: getAllOrderUsecase) {}

  async run(_request: Request, response: Response) {
    return response.json(await this.useCase.handle());
  }
}

export { GetAllOrdersController };
