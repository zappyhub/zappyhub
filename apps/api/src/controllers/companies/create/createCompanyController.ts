import { Request, Response } from "express";
import { CreateCompanyUseCase } from "@/usecases/companies/createCompanyUseCase";
import logger from "@/services/logger/logger";

class CreateCompanyController {
    constructor(private useCase: CreateCompanyUseCase) {}

    async run(request: Request, response: Response) {
        logger.info("[COMPANY DOMAIN - CreateCompanyController]: Requisição recebida para criar empresa");

        try {
            const data = request.body;

            if (!data.companyName) {
                return response.status(400).json({ error: "Nome da empresa é obrigatório" });
            }

            const company = await this.useCase.handle(data);
            logger.info(`[COMPANY DOMAIN - CreateCompanyController]: Empresa criada com sucesso - ID: ${company.id}`);

            return response.status(201).json(company);
        } catch (error: any) {
            logger.error(`[COMPANY DOMAIN - CreateCompanyController]: Falha ao criar empresa - ${error.message}`);
            return response.status(400).json({ error: error.message });
        }
    }
}

export { CreateCompanyController };