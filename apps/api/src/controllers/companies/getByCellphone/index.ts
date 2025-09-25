import {PrismaPostgresCompanyImplementation} from "@/implementations/companies/companyPrismaPostgresImpl";
import {FindCompanyByCellphoneUseCase} from "@/usecases/companies/findCompanyByCellphoneUseCase";
import {GetCompanyByCellphoneController} from "@/controllers/companies/getByCellphone/getCompanyByCellphoneController";

const postgresImpl = new PrismaPostgresCompanyImplementation();
const useCase = new FindCompanyByCellphoneUseCase(postgresImpl);
const getCompanyByCellphoneController = new GetCompanyByCellphoneController(useCase);

export default getCompanyByCellphoneController;
