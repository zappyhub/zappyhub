import type { Orders, Prisma } from "@/services/prisma";
import { PrismaClient } from "@prisma/client";

export type OrderWithItems = Prisma.OrdersGetPayload<{
  include: { items: true };
}>;

interface IOrderRepo {
  client: typeof PrismaClient;
  createOrder(data: OrderWithItems): Promise<void>;
  getAllOrders(): Promise<OrderWithItems[]>;
  getOrderById(id: string): Promise<OrderWithItems | undefined>;
  orderExists(id: string): Promise<Boolean>;
}

export default IOrderRepo;
