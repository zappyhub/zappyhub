import { Request, Response } from "express";
import { FindAllCompaniesUseCase } from "@/usecases/companies/findAllCompaniesUseCase";
import logger from "@/services/logger/logger";

class GetAllCompaniesController {
    constructor(private useCase: FindAllCompaniesUseCase) {}

    async run(_request: Request, response: Response) {
        logger.info("[COMPANY DOMAIN - GetAllCompaniesController]: Buscando todas as empresas");

        try {
            const companies = await this.useCase.handle();
            logger.info(`[COMPANY DOMAIN - GetAllCompaniesController]: ${companies.length} empresas encontradas`);

            return response.status(200).json(companies);
        } catch (error: any) {
            logger.error(`[COMPANY DOMAIN - GetAllCompaniesController]: Erro ao buscar empresas - ${error.message}`);
            return response.status(500).json({ error: "Falha ao buscar empresas" });
        }
    }
}

export { GetAllCompaniesController };