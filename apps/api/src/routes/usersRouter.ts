import { Router } from "express";

import createUserController from "@/controllers/users/create";

const usersRouter = Router();

usersRouter.post("/new", (req, res) => {
  createUserController.run(req, res);
});

export default usersRouter;
