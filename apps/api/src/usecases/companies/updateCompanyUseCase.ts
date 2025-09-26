import { ICompanyRepo, CompanyUpdateData } from "@/interfaces/ICompanyRepo";

class UpdateCompanyUseCase {
    constructor(private companyRepo: ICompanyRepo) {}

    async handle(id: string, data: CompanyUpdateData) {
        try {
            const exists = await this.companyRepo.exists(id);
            if (!exists) {
                throw new Error(`Empresa com ID ${id} não existe`);
            }
            return await this.companyRepo.update(id, data);
        } catch (error) {
            throw new Error(`Falha ao atualizar empresa: ${error.message}`);
        }
    }
}

export { UpdateCompanyUseCase };