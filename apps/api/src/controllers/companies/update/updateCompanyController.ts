import { Request, Response } from "express";
import { UpdateCompanyUseCase } from "@/usecases/companies/updateCompanyUseCase";
import logger from "@/services/logger/logger";

class UpdateCompanyController {
    constructor(private useCase: UpdateCompanyUseCase) {}

    async run(request: Request, response: Response) {
        const { id } = request.params;
        const data = request.body;
        logger.info(`[COMPANY DOMAIN - UpdateCompanyController]: Atualizando empresa com ID: ${id}`);

        try {
            const updatedCompany = await this.useCase.handle(id, data);
            return response.status(200).json(updatedCompany);
        } catch (error: any) {
            logger.error(`[COMPANY DOMAIN - UpdateCompanyController]: Falha ao atualizar empresa - ${error.message}`);
            return response.status(400).json({ error: error.message });
        }
    }
}

export { UpdateCompanyController };