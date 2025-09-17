import { Request, Response } from "express";
import { FindCompanyByIdUseCase } from "@/usecases/companies/findCompanyByIdUseCase";
import logger from "@/services/logger/logger";

class GetCompanyByIdController {
    constructor(private useCase: FindCompanyByIdUseCase) {}

    async run(request: Request, response: Response) {
        const { id } = request.params;
        logger.info(`[COMPANY DOMAIN - GetCompanyByIdController]: Buscando empresa por ID: ${id}`);

        try {
            const company = await this.useCase.handle(id);
            return response.status(200).json(company);
        } catch (error: any) {
            logger.warn(`[COMPANY DOMAIN - GetCompanyByIdController]: ${error.message}`);
            return response.status(404).json({ error: error.message });
        }
    }
}

export { GetCompanyByIdController };