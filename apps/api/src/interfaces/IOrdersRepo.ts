import type { Prisma } from "@/services/prisma";

export type OrderWithItems = Prisma.OrdersGetPayload<{
  include: { items: true };
}>;

interface IOrderRepo {
  createOrder(data: OrderWithItems): Promise<void>;
  getAllOrders(): Promise<OrderWithItems[]>;
  getOrderById(id: string): Promise<OrderWithItems | undefined>;
  orderExists(id: string): Promise<Boolean>;
}

export default IOrderRepo;
