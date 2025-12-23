import { ICompanyRepo } from "@/interfaces/ICompanyRepo";

class CompanyExistsUseCase {
  constructor(private companyRepo: ICompanyRepo) {}

  async handle(id: string): Promise<boolean> {
    try {
      return await this.companyRepo.exists(id);
    } catch (error: unknown) {
      throw new Error("Falha ao verificar existência da empresa", {
        cause: error,
      });
    }
  }
}

export { CompanyExistsUseCase };
