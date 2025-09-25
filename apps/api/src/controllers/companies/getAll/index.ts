import {PrismaPostgresCompanyImplementation} from "@/implementations/companies/companyPrismaPostgresImpl";
import {FindAllCompaniesUseCase} from "@/usecases/companies/findAllCompaniesUseCase";
import {GetAllCompaniesController} from "@/controllers/companies/getAll/getAllCompaniesController";

const postgresImpl = new PrismaPostgresCompanyImplementation();
const useCase = new FindAllCompaniesUseCase(postgresImpl);
const getAllCompaniesController = new GetAllCompaniesController(useCase);

export default getAllCompaniesController;
