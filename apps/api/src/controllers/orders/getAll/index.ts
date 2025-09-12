import OrderPrismaPostgresImplementation from "@/implementations/orders/orderPrismaPostgresImpl";
import { getAllOrderUsecase } from "@/usecases/orders/getAllOrderUsecase";
import { GetAllOrdersController } from "./getAllOrdersController";

const postgresImpl = new OrderPrismaPostgresImplementation();
const useCase = new getAllOrderUsecase(postgresImpl);
const getAllOrderController = new GetAllOrdersController(useCase);

export default getAllOrderController;
