import createOrderController from "@/controllers/orders/create";
import getAllOrderController from "@/controllers/orders/getAll";
import { Router } from "express";

const ordersRouter = Router();

ordersRouter.post("/new", (req, res) => {
  createOrderController.run(req, res);
});

ordersRouter.get("/", (req, res) => {
  getAllOrderController.run(req, res);
});

export default ordersRouter;
