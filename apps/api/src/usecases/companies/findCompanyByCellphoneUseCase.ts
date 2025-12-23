import { ICompanyRepo } from "@/interfaces/ICompanyRepo";

class FindCompanyByCellphoneUseCase {
  constructor(private companyRepo: ICompanyRepo) {}

  async handle(cellphoneNumber: string) {
    try {
      const company =
        await this.companyRepo.findByCellphoneNumber(cellphoneNumber);
      if (!company) {
        throw new Error(
          `Empresa com número de celular ${cellphoneNumber} não encontrada`
        );
      }
      return company;
    } catch (error) {
      throw new Error("Falha ao verificar existência da empresa", {
        cause: error,
      });
    }
  }
}

export { FindCompanyByCellphoneUseCase };
