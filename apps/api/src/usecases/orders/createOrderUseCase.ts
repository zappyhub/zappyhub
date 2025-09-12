import IOrderRepo, { type OrderWithItems } from "@/interfaces/IOrdersRepo";

class createOrderUseCase {
  constructor(private createOrderUseCaseRepo: IOrderRepo) {}
  //Como a order não tem um campo unico que dependa do input do usuário o exemplo não funciona bem, mas imagine que seja o email unico e que essa função recebe o email.
  //O prisma já gerencia a validação de campos unicos então olhem a documentação do método prisma.create dando hover sobre o método por alguns segundos que ele fala os returns
  async handle(data: OrderWithItems) {
    /*
      const orderExists = await this.createOrderUseCase.orderExists(id)
      if(!orderExists) {
        Criar ordem
      } else {
        retorna error
      }
    */

    try {
      await this.createOrderUseCaseRepo.createOrder(data);
    } catch (error) {
      return new Error("Falha ao criar ordem no useCase");
    }
  }
}

export { createOrderUseCase };
