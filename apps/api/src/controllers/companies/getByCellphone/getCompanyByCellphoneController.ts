import { Request, Response } from "express";
import { FindCompanyByCellphoneUseCase } from "@/usecases/companies/findCompanyByCellphoneUseCase";
import logger from "@/services/logger/logger";

class GetCompanyByCellphoneController {
    constructor(private useCase: FindCompanyByCellphoneUseCase) {}

    async run(request: Request, response: Response) {
        const { cellphone } = request.query;
        logger.info(`[COMPANY DOMAIN - GetCompanyByCellphoneController]: Buscando empresa por celular: ${cellphone}`);

        if (!cellphone || typeof cellphone !== 'string') {
            return response.status(400).json({ error: "Número de celular é obrigatório" });
        }

        try {
            const company = await this.useCase.handle(cellphone);
            return response.status(200).json(company);
        } catch (error: any) {
            logger.warn(`[COMPANY DOMAIN - GetCompanyByCellphoneController]: ${error.message}`);
            return response.status(404).json({ error: error.message });
        }
    }
}

export { GetCompanyByCellphoneController };