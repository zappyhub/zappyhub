import IOrderRepo, { type OrderWithItems } from "@/interfaces/IOrdersRepo";
import { OrderItems } from "@/services/prisma";
import { prisma } from "@/infra/prisma";
import { isPrismaKnownRequestError } from "@/utils/prisma";

class OrderPrismaPostgresImplementation implements IOrderRepo {
  async createOrder(data: OrderWithItems): Promise<void> {
    const { customerName, customerPhone, items, status, totalAmount } = data;

    try {
      await prisma.orders.create({
        data: {
          customerName,
          customerPhone,
          totalAmount,
          status,
          items: {
            create: items.map((item: OrderItems) => ({
              itemName: item.itemName,
              itemQuantity: item.itemQuantity,
              unitPrice: item.unitPrice,
              totalPrice: item.totalPrice,
            })),
          },
        },
      });
    } catch (error) {
      return;
    }
  }

  async getAllOrders(): Promise<OrderWithItems[]> {
    return await prisma.orders.findMany({
      where: {
        deletedAt: {
          equals: null,
        },
      },
      include: {
        items: true,
      },
    });
  }

  async getOrderById(id: string): Promise<OrderWithItems | undefined> {
    try {
      const order = await prisma.orders.findUniqueOrThrow({
        where: {
          id,
        },
        include: {
          items: true,
        },
      });

      return order;
    } catch (error: unknown) {
      if (isPrismaKnownRequestError(error) && error.code === "P2025") {
        console.log("Order not found");
        return undefined;
      }
      return undefined;
    }
  }

  async orderExists(id: string): Promise<Boolean> {
    return (await this.getOrderById(id)) !== undefined ? true : false;
  }
}

export default OrderPrismaPostgresImplementation;
