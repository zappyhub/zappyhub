import OrderPrismaPostgresImplementation from "@/implementations/orders/orderPrismaPostgresImpl";
import { createOrderUseCase } from "@/usecases/orders/createOrderUseCase";
import { CreateOrderController } from "@/controllers/orders/create/createOrderController";

const postgresImpl = new OrderPrismaPostgresImplementation();
const useCase = new createOrderUseCase(postgresImpl);
const createOrderController = new CreateOrderController(useCase);

export default createOrderController;
