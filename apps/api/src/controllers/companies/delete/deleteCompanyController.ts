import { Request, Response } from "express";
import { DeleteCompanyUseCase } from "@/usecases/companies/deleteCompanyUseCase";
import logger from "@/services/logger/logger";

class DeleteCompanyController {
    constructor(private useCase: DeleteCompanyUseCase) {}

    async run(request: Request, response: Response) {
        const { id } = request.params;
        logger.info(`[COMPANY DOMAIN - DeleteCompanyController]: Deletando empresa com ID: ${id}`);

        try {
            await this.useCase.handle(id);
            logger.info(`[COMPANY DOMAIN - DeleteCompanyController]: Empresa com ID ${id} deletada com sucesso`);
            return response.status(204).send(); // No Content
        } catch (error: any) {
            logger.error(`[COMPANY DOMAIN - DeleteCompanyController]: Falha ao deletar empresa - ${error.message}`);
            return response.status(400).json({ error: error.message });
        }
    }
}

export { DeleteCompanyController };