import {PrismaPostgresCompanyImplementation} from "@/implementations/orders/companyPrismaPostgresImpl";
import {
    GetCompanyByCompanyNameController
} from "@/controllers/companies/getByCompanyName/getCompanyByCompanyNameController";
import {FindCompanyByCompanyNameUseCase} from "@/usecases/companies/findCompanyByCompanyNameUseCase";

const postgresImpl = new PrismaPostgresCompanyImplementation();
const useCase = new FindCompanyByCompanyNameUseCase(postgresImpl);
const getCompanyByCompanyNameController = new GetCompanyByCompanyNameController(useCase);

export default getCompanyByCompanyNameController;
