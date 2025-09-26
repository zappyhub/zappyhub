import { ICompanyRepo } from "@/interfaces/ICompanyRepo";

class FindAllCompaniesUseCase {
    constructor(private companyRepo: ICompanyRepo) {}

    async handle() {
        try {
            return await this.companyRepo.findAll();
        } catch (error) {
            throw new Error("Falha ao buscar todas as empresas no use case");
        }
    }
}

export { FindAllCompaniesUseCase };