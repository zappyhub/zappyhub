import { Router } from "express";

const userRouter = Router();

userRouter.get("/", (_req, res) => {
  return res.send({ message: "Hello from user router!" });
});

export default userRouter;
