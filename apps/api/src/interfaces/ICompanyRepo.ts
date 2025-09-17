import type { Company } from "@/services/prisma";

export type CompanyCreateData = Omit<
    Company,
    "id" | "createdAt" | "updatedAt" | "deletedAt"
>;

export type CompanyUpdateData = Partial<Omit<Company, "id" | "createdAt" | "deletedAt">>;

export interface ICompanyRepo {
    /**
     * Cria uma nova empresa
     */
    create(data: CompanyCreateData): Promise<Company>;

    /**
     * Busca todas as empresas ativas (soft delete)
     */
    findAll(): Promise<Company[]>;

    /**
     * Busca uma empresa pelo ID
     */
    findById(id: string): Promise<Company | null>;

    /**
     * Busca uma empresa por email
     */
    findByEmail(email: string): Promise<Company | null>;

    /**
     * Busca uma empresa por número de celular
     */
    findByCellphoneNumber(cellphoneNumber: string): Promise<Company | null>;

    /**
     * Busca uma empresa por razão social (companyName)
     */
    findByCompanyName(companyName: string): Promise<Company | null>;

    /**
     * Atualiza uma empresa pelo ID
     */
    update(id: string, data: CompanyUpdateData): Promise<Company>;

    /**
     * Deleta (soft delete) uma empresa definindo o campo deletedAt
     */
    delete(id: string): Promise<void>;

    /**
     * Verifica se a empresa existe pelo ID
     */
    exists(id: string): Promise<boolean>;
}
