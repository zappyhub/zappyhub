import { ICompanyRepo } from "@/interfaces/ICompanyRepo";

class FindCompanyByIdUseCase {
  constructor(private companyRepo: ICompanyRepo) {}

  async handle(id: string) {
    try {
      const company = await this.companyRepo.findById(id);
      if (!company) {
        throw new Error(`Empresa com ID ${id} não encontrada`);
      }
      return company;
    } catch (error) {
      throw new Error("Falha ao verificar existência da empresa", {
        cause: error,
      });
    }
  }
}

export { FindCompanyByIdUseCase };
