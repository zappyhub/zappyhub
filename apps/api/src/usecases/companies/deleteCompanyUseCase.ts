import { ICompanyRepo } from "@/interfaces/ICompanyRepo";

class DeleteCompanyUseCase {
    constructor(private companyRepo: ICompanyRepo) {}

    async handle(id: string) {
        try {
            const exists = await this.companyRepo.exists(id);
            if (!exists) {
                throw new Error(`Empresa com ID ${id} não existe`);
            }
            await this.companyRepo.delete(id);
        } catch (error) {
            throw new Error(`Falha ao deletar empresa: ${error.message}`);
        }
    }
}

export { DeleteCompanyUseCase };