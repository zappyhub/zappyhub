import { loginController } from "@/controllers/auth";
import { Router } from "express";



const authRouter = Router();

authRouter.post("/login", (req, res) => loginController.run(req, res))

export default authRouter;
