import {PrismaPostgresCompanyImplementation} from "@/implementations/companies/companyPrismaPostgresImpl";
import {GetCompanyByEmailController} from "@/controllers/companies/getByEmail/getCompanyByEmailController";
import {FindCompanyByEmailUseCase} from "@/usecases/companies/findCompanyByEmailUseCase";

const postgresImpl = new PrismaPostgresCompanyImplementation();
const useCase = new FindCompanyByEmailUseCase(postgresImpl);
const getCompanyByEmailController = new GetCompanyByEmailController(useCase);

export default getCompanyByEmailController;
