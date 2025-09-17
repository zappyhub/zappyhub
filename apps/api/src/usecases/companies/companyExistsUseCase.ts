import { ICompanyRepo } from "@/interfaces/ICompanyRepo";

class CompanyExistsUseCase {
    constructor(private companyRepo: ICompanyRepo) {}

    async handle(id: string): Promise<boolean> {
        try {
            return await this.companyRepo.exists(id);
        } catch (error) {
            throw new Error(`Falha ao verificar existência da empresa: ${error.message}`);
        }
    }
}

export { CompanyExistsUseCase };