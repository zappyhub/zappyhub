import loginController from "@/controllers/auth/login";
import { logoutController } from "@/controllers/auth/logout";
import refreshController from "@/controllers/auth/refresh";
import { Router } from "express";

export const authRouter = Router();

authRouter.post("/login", (req, res, next) => {
  loginController(req, res, next);
});

authRouter.post("/refresh", (req, res, next) => {
  refreshController(req, res, next);
});

authRouter.post("/logout", (req, res) => {
  logoutController(req, res);
});

export default authRouter;
