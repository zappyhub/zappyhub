import {PrismaPostgresCompanyImplementation} from "@/implementations/orders/companyPrismaPostgresImpl";
import {DeleteCompanyUseCase} from "@/usecases/companies/deleteCompanyUseCase";
import {DeleteCompanyController} from "@/controllers/companies/delete/deleteCompanyController";

const postgresImpl = new PrismaPostgresCompanyImplementation();
const useCase = new DeleteCompanyUseCase(postgresImpl);
const deleteCompanyController = new DeleteCompanyController(useCase);

export default deleteCompanyController;
