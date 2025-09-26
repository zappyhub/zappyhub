import { ICompanyRepo } from "@/interfaces/ICompanyRepo";

class FindCompanyByCompanyNameUseCase {
    constructor(private companyRepo: ICompanyRepo) {}

    async handle(companyName: string) {
        try {
            const company = await this.companyRepo.findByCompanyName(companyName);
            if (!company) {
                throw new Error(`Empresa com nome "${companyName}" não encontrada`);
            }
            return company;
        } catch (error) {
            throw new Error(`Falha ao buscar empresa por nome: ${error.message}`);
        }
    }
}

export { FindCompanyByCompanyNameUseCase };