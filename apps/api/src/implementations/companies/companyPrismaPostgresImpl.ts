import {
  CompanyCreateData,
  CompanyUpdateData,
  ICompanyRepo,
} from "@/interfaces/ICompanyRepo";
import { decrypt, encrypt } from "@/services/common/crypto";
import logger from "@/services/logger/logger";
import { PrismaClient } from "@/services/prisma";
import { Company } from "@/services/prisma";
import { PrismaClientKnownRequestError } from "@/services/prisma/runtime/client";
import { isPrismaKnownRequestError } from "@/utils/prisma";

export class PrismaPostgresCompanyImplementation implements ICompanyRepo {
  client = new PrismaClient().company;

  async create(data: CompanyCreateData): Promise<Company> {
    logger.info(
      "[COMPANY DOMAIN - PrismaPostgresCompanyImplementation]: Creating new company"
    );

    try {
      const encryptedEmail = data.email ? encrypt(data.email) : null;
      const encryptedCellphone = data.cellphoneNumber
        ? encrypt(data.cellphoneNumber)
        : null;

      const company = await this.client.create({
        data: {
          ...data,
          email: encryptedEmail,
          cellphoneNumber: encryptedCellphone,
        },
      });

      logger.info(
        `[COMPANY DOMAIN - PrismaPostgresCompanyImplementation]: Company created successfully with ID: ${company.id}`
      );

      return this.decryptCompany(company);
    } catch (error) {
      logger.error(
        `[COMPANY DOMAIN - PrismaPostgresCompanyImplementation]: Failed to create company - ${error}`
      );
      throw error;
    }
  }

  async findAll(): Promise<Company[]> {
    logger.info(
      "[COMPANY DOMAIN - PrismaPostgresCompanyImplementation]: Finding all companies"
    );

    try {
      const companies = await this.client.findMany({
        where: {
          deletedAt: null,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      logger.info(
        `[COMPANY DOMAIN - PrismaPostgresCompanyImplementation]: Found ${companies.length} companies`
      );

      return companies.map((company) => this.decryptCompany(company));
    } catch (error) {
      logger.error(
        `[COMPANY DOMAIN - PrismaPostgresCompanyImplementation]: Failed to find companies - ${error}`
      );
      throw error;
    }
  }

  async findById(id: string): Promise<Company | null> {
    logger.info(
      `[COMPANY DOMAIN - PrismaPostgresCompanyImplementation]: Finding company by ID: ${id}`
    );

    try {
      const company = await this.client.findUniqueOrThrow({
        where: {
          id,
          deletedAt: null,
        },
      });

      if (!company) {
        logger.info(
          `[COMPANY DOMAIN - PrismaPostgresCompanyImplementation]: Company not found with ID: ${id}`
        );
        return null;
      }

      logger.info(
        `[COMPANY DOMAIN - PrismaPostgresCompanyImplementation]: Company found with ID: ${id}`
      );

      return this.decryptCompany(company);
    } catch (error: unknown) {
      if (isPrismaKnownRequestError(error) && error.code === "P2025") {
        {
          logger.info(
            `[COMPANY DOMAIN - PrismaPostgresCompanyImplementation]: Company not found with id: ${id}`
          );
          throw new Error("Company not found");
        }
      }
      logger.error(
        `[COMPANY DOMAIN - PrismaPostgresCompanyImplementation]: Failed to find company by ID`,
        error
      );

      throw error;
    }
  }

  async findByEmail(email: string): Promise<Company | null> {
    logger.info(
      "[COMPANY DOMAIN - PrismaPostgresCompanyImplementation]: Finding company by email"
    );

    try {
      const encryptedEmail = encrypt(email);

      const company = await this.client.findUniqueOrThrow({
        where: {
          email: encryptedEmail,
          deletedAt: null,
        },
      });

      if (!company) {
        logger.info(
          "[COMPANY DOMAIN - PrismaPostgresCompanyImplementation]: Company not found with provided email"
        );
        return null;
      }

      logger.info(
        `[COMPANY DOMAIN - PrismaPostgresCompanyImplementation]: Company found with provided email`
      );

      return this.decryptCompany(company);
    } catch (error) {
      if (isPrismaKnownRequestError(error) && error.code === "P2025") {
        logger.info(
          `[COMPANY DOMAIN - PrismaPostgresCompanyImplementation]: Company not found with email: ${email}`
        );
        throw new Error("Company not found");
      }
      logger.error(
        `[COMPANY DOMAIN - PrismaPostgresCompanyImplementation]: Failed to find company by email - ${error}`
      );
      throw error;
    }
  }

  async findByCellphoneNumber(
    cellphoneNumber: string
  ): Promise<Company | null> {
    logger.info(
      "[COMPANY DOMAIN - PrismaPostgresCompanyImplementation]: Finding company by cellphone number"
    );

    try {
      const encryptedCellphone = encrypt(cellphoneNumber);

      const company = await this.client.findUniqueOrThrow({
        where: {
          cellphoneNumber: encryptedCellphone,
          deletedAt: null,
        },
      });

      if (!company) {
        logger.info(
          "[COMPANY DOMAIN - PrismaPostgresCompanyImplementation]: Company not found with provided cellphone number"
        );
        return null;
      }

      logger.info(
        "[COMPANY DOMAIN - PrismaPostgresCompanyImplementation]: Company found with provided cellphone number"
      );

      return this.decryptCompany(company);
    } catch (error) {
      if (isPrismaKnownRequestError(error) && error.code === "P2025") {
        logger.info(
          `[COMPANY DOMAIN - PrismaPostgresCompanyImplementation]: Company not found with cellphone: ${cellphoneNumber}`
        );
        throw new Error("Company not found");
      }
      logger.error(
        `[COMPANY DOMAIN - PrismaPostgresCompanyImplementation]: Failed to find company by cellphone - ${error}`
      );
      throw error;
    }
  }

  async findByCompanyName(companyName: string): Promise<Company | null> {
    logger.info(
      `[COMPANY DOMAIN - PrismaPostgresCompanyImplementation]: Finding company by name: ${companyName}`
    );

    try {
      const company = await this.client.findUniqueOrThrow({
        where: {
          companyName,
          deletedAt: null,
        },
      });

      if (!company) {
        logger.info(
          `[COMPANY DOMAIN - PrismaPostgresCompanyImplementation]: Company not found with name: ${companyName}`
        );
        return null;
      }

      logger.info(
        `[COMPANY DOMAIN - PrismaPostgresCompanyImplementation]: Company found with name: ${companyName}`
      );

      return this.decryptCompany(company);
    } catch (error) {
      if (isPrismaKnownRequestError(error) && error.code === "P2025") {
        logger.info(
          `[COMPANY DOMAIN - PrismaPostgresCompanyImplementation]: Company not found with name: ${companyName}`
        );
        throw new Error("Company not found");
      }
      logger.error(
        `[COMPANY DOMAIN - PrismaPostgresCompanyImplementation]: Failed to find company by name - ${error}`
      );
      throw error;
    }
  }

  async update(id: string, data: CompanyUpdateData): Promise<Company> {
    logger.info(
      `[COMPANY DOMAIN - PrismaPostgresCompanyImplementation]: Updating company with ID: ${id}`
    );

    try {
      const updateData = { ...data };

      const updatedCompany = await this.client.update({
        where: { id },
        data: updateData,
      });

      logger.info(
        `[COMPANY DOMAIN - PrismaPostgresCompanyImplementation]: Company updated successfully with ID: ${id}`
      );

      return this.decryptCompany(updatedCompany);
    } catch (error) {
      logger.error(
        `[COMPANY DOMAIN - PrismaPostgresCompanyImplementation]: Failed to update company - ${error}`
      );
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    logger.info(
      `[COMPANY DOMAIN - PrismaPostgresCompanyImplementation]: Soft deleting company with ID: ${id}`
    );

    try {
      await this.client.update({
        where: { id },
        data: {
          deletedAt: new Date(),
        },
      });

      logger.info(
        `[COMPANY DOMAIN - PrismaPostgresCompanyImplementation]: Company soft deleted successfully with ID: ${id}`
      );
    } catch (error) {
      logger.error(
        `[COMPANY DOMAIN - PrismaPostgresCompanyImplementation]: Failed to delete company - ${error}`
      );
      throw error;
    }
  }

  async exists(id: string): Promise<boolean> {
    logger.info(
      `[COMPANY DOMAIN - PrismaPostgresCompanyImplementation]: Checking if company exists with ID: ${id}`
    );

    try {
      const count = await this.client.count({
        where: {
          id,
          deletedAt: null,
        },
      });

      const exists = count > 0;
      logger.info(
        `[COMPANY DOMAIN - PrismaPostgresCompanyImplementation]: Company exists: ${exists}`
      );

      return exists;
    } catch (error) {
      logger.error(
        `[COMPANY DOMAIN - PrismaPostgresCompanyImplementation]: Failed to check company existence - ${error}`
      );
      throw error;
    }
  }

  /**
   * Método privado para descriptografar dados sensíveis da empresa
   */
  private decryptCompany(company: Company): Company {
    return {
      ...company,
      email: company.email ? decrypt(company.email) : null,
      cellphoneNumber: company.cellphoneNumber
        ? decrypt(company.cellphoneNumber)
        : null,
    };
  }
}
