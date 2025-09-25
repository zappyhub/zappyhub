import {PrismaPostgresCompanyImplementation} from "@/implementations/companies/companyPrismaPostgresImpl";
import {UpdateCompanyController} from "@/controllers/companies/update/updateCompanyController";
import {UpdateCompanyUseCase} from "@/usecases/companies/updateCompanyUseCase";

const postgresImpl = new PrismaPostgresCompanyImplementation();
const useCase = new UpdateCompanyUseCase(postgresImpl);
const updateCompanyController = new UpdateCompanyController(useCase);

export default updateCompanyController;
