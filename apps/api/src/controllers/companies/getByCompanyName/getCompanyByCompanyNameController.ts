import { Request, Response } from "express";
import { FindCompanyByCompanyNameUseCase } from "@/usecases/companies/findCompanyByCompanyNameUseCase";
import logger from "@/services/logger/logger";

class GetCompanyByCompanyNameController {
    constructor(private useCase: FindCompanyByCompanyNameUseCase) {}

    async run(request: Request, response: Response) {
        const { companyName } = request.query;
        logger.info(`[COMPANY DOMAIN - GetCompanyByCompanyNameController]: Buscando empresa por nome: ${companyName}`);

        if (!companyName || typeof companyName !== 'string') {
            return response.status(400).json({ error: "Nome da empresa é obrigatório" });
        }

        try {
            const company = await this.useCase.handle(companyName);
            return response.status(200).json(company);
        } catch (error: any) {
            logger.warn(`[COMPANY DOMAIN - GetCompanyByCompanyNameController]: ${error.message}`);
            return response.status(404).json({ error: error.message });
        }
    }
}

export { GetCompanyByCompanyNameController };