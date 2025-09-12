import IOrderRepo from "@/interfaces/IOrdersRepo";

class getAllOrderUsecase {
  constructor(private getAllOrderUsecaseRepo: IOrderRepo) {}

  async handle() {
    return await this.getAllOrderUsecaseRepo.getAllOrders();
  }
}

export { getAllOrderUsecase };
