import { Request, Response } from "express";
import { createOrderUseCase } from "@/usecases/orders/createOrderUseCase";
import type { OrderWithItems } from "@/interfaces/IOrdersRepo";
import logger from "@/services/logger/logger";

class CreateOrderController {
  constructor(private useCase: createOrderUseCase) {}

  async run(request: Request, response: Response) {
    logger.info(
      "[ORDERS DOMAIN -  createOrderController]: Sever issued to create a new order"
    );
    const data: OrderWithItems = request.body as unknown as OrderWithItems;
    logger.info(
      "[ORDERS DOMAIN -  createOrderController]: Data recived from request.body: \n" +
        JSON.stringify(request.body)
    );

    try {
      await this.useCase.handle(data);
      logger.info(
        `[ORDERS DOMAIN -  createOrderController]: Use case run success sending 201`
      );

      return response
        .status(201)
        .json({ message: "Order created successfully" });
    } catch (error) {
      //tratar erros
      logger.error(
        `[ORDERS DOMAIN -  createOrderController]: Server faield to create a new order`
      );
      logger.error(`[ORDERS DOMAIN -  createOrderController]: ${error}`);
      return response.status(500).json({ message: "Something went wrong :/" });
    }
  }
}

export { CreateOrderController };
