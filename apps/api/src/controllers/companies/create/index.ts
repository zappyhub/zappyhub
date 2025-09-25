import {CreateCompanyUseCase} from "@/usecases/companies/createCompanyUseCase";
import {PrismaPostgresCompanyImplementation} from "@/implementations/companies/companyPrismaPostgresImpl";
import {CreateCompanyController} from "@/controllers/companies/create/createCompanyController";

const postgresImpl = new PrismaPostgresCompanyImplementation();
const useCase = new CreateCompanyUseCase(postgresImpl);
const createCompanyController = new CreateCompanyController(useCase);

export default createCompanyController;
