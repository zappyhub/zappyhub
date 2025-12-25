import { Router } from "express";

import createUserController from "@/controllers/users/create";
import getAllUsersController from "@/controllers/users/getAll";
import getUserByCellphoneNumberController from "@/controllers/users/getUserByCellphoneNumber";
import getUserByEmailController from "@/controllers/users/getUserByEmail";
import getUserByIdController from "@/controllers/users/getUserById";
import hardDeleteUserController from "@/controllers/users/hardDeleteUser";
import softDeleteUserController from "@/controllers/users/softDeleteUser";
import updateUserController from "@/controllers/users/update";
import getLoggedUserController from "@/controllers/users/getLoggedUsed";

import { verifyJWT } from "@/controllers/auth/verifyJWT";

const usersRouter = Router();

//Create user
usersRouter.post("/new", (req, res) => {
  createUserController.run(req, res);
});

//Get all users
usersRouter.get("/", (req, res) => {
  getAllUsersController.run(req, res);
});

//Get user by identities
usersRouter.get("/find/", (req, res) => {
  const { id, email, cellphoneNumber } = req.query;

  const filters = [
    id ? "id" : null,
    email ? "email" : null,
    cellphoneNumber ? "cellphoneNumber" : null,
  ].filter(Boolean);

  if (filters.length === 0) {
    return res.status(400).json({
      message: "Informe id, email ou cellphoneNumber",
    });
  }

  if (filters.length > 1) {
    return res.status(400).json({
      message: "Informe apenas um filtro por vez",
      received: filters,
    });
  }

  if (cellphoneNumber) getUserByCellphoneNumberController.run(req, res);
  if (email) getUserByEmailController.run(req, res);
  if (id) getUserByIdController;

  return res.status(404).send({ message: "Cannot find user! No paramenters" });
});

usersRouter.delete("/hard/:userId", (req, res) => {
  hardDeleteUserController.run(req, res);
});

usersRouter.delete("/soft/:userId", (req, res) => {
  softDeleteUserController.run(req, res);
});

usersRouter.put("/update/:userId", (req, res) => {
  updateUserController.run(req, res);
});

usersRouter.get("/me", verifyJWT, (req, res) => {
  getLoggedUserController.run(req, res);
});

export default usersRouter;
