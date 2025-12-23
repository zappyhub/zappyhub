import { ICompanyRepo } from "@/interfaces/ICompanyRepo";

class FindCompanyByEmailUseCase {
  constructor(private companyRepo: ICompanyRepo) {}

  async handle(email: string) {
    try {
      const company = await this.companyRepo.findByEmail(email);
      if (!company) {
        throw new Error(`Empresa com email ${email} não encontrada`);
      }
      return company;
    } catch (error) {
      throw new Error("Falha ao verificar existência da empresa", {
        cause: error,
      });
    }
  }
}

export { FindCompanyByEmailUseCase };
