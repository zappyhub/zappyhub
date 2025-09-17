import { Router } from "express";

import createCompanyController from "@/controllers/companies/create";
import getAllCompaniesController from "@/controllers/companies/getAll";
import getCompanyByIdController from "@/controllers/companies/getById";
import getCompanyByEmailController from "@/controllers/companies/getByEmail";
import getCompanyByCellphoneController from "@/controllers/companies/getByCellphone";
import getCompanyByCompanyNameController from "@/controllers/companies/getByCompanyName";
import updateCompanyController from "@/controllers/companies/update";
import deleteCompanyController from "@/controllers/companies/delete";

const companyRouter = Router();

companyRouter.post("/new", (req, res) => {
    createCompanyController.run(req, res);
});

companyRouter.get("/", (req, res) => {
    getAllCompaniesController.run(req, res);
});

companyRouter.get("/:id", (req, res) => {
    getCompanyByIdController.run(req, res);
});

companyRouter.get("/search/email", (req, res) => {
    getCompanyByEmailController.run(req, res);
});

companyRouter.get("/search/cellphone", (req, res) => {
    getCompanyByCellphoneController.run(req, res);
});

companyRouter.get("/search/name", (req, res) => {
    getCompanyByCompanyNameController.run(req, res);
});

companyRouter.put("/:id", (req, res) => {
    updateCompanyController.run(req, res);
});

companyRouter.delete("/:id", (req, res) => {
    deleteCompanyController.run(req, res);
});

export default companyRouter;