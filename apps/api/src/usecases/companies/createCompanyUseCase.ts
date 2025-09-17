import {CompanyCreateData, ICompanyRepo} from "@/interfaces/ICompanyRepo";
import {Company} from "@/services/prisma";

export class CreateCompanyUseCase {
    constructor(private companyRepo: ICompanyRepo) {
    }

    async execute(data: CompanyCreateData): Promise<Company> {
        if (!data.companyName || data.companyName.trim() === '') {
            throw new Error('Nome da empresa é obrigatório');
        }

        const existingCompany = await this.companyRepo.findByCompanyName(data.companyName);
        if (existingCompany) {
            throw new Error('Já existe uma empresa com este nome');
        }

        return await this.companyRepo.create(data);
    }
}