import { Request, Response } from "express";
import { FindCompanyByEmailUseCase } from "@/usecases/companies/findCompanyByEmailUseCase";
import logger from "@/services/logger/logger";

class GetCompanyByEmailController {
    constructor(private useCase: FindCompanyByEmailUseCase) {}

    async run(request: Request, response: Response) {
        const { email } = request.query;
        logger.info(`[COMPANY DOMAIN - GetCompanyByEmailController]: Buscando empresa por email: ${email}`);

        if (!email || typeof email !== 'string') {
            return response.status(400).json({ error: "Email é obrigatório" });
        }

        try {
            const company = await this.useCase.handle(email);
            return response.status(200).json(company);
        } catch (error: any) {
            logger.warn(`[COMPANY DOMAIN - GetCompanyByEmailController]: ${error.message}`);
            return response.status(404).json({ error: error.message });
        }
    }
}

export { GetCompanyByEmailController };