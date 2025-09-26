import {PrismaPostgresCompanyImplementation} from "@/implementations/companies/companyPrismaPostgresImpl";
import {GetCompanyByIdController} from "@/controllers/companies/getById/getCompanyByIdController";
import {FindCompanyByIdUseCase} from "@/usecases/companies/findCompanyByIdUseCase";

const postgresImpl = new PrismaPostgresCompanyImplementation();
const useCase = new FindCompanyByIdUseCase(postgresImpl);
const getCompanyByIdController = new GetCompanyByIdController(useCase);

export default getCompanyByIdController;
