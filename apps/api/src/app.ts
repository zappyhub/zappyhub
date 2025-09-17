import express from "express";
import userRouter from "@/routes/userRouter";
import ordersRouter from "./routes/ordersRouter";
import companyRouter from "@/routes/companyRouter";

export const app = express();
app.use(express.json());

app.get("/", (_req, res) => {
  return res.send({ Message: "Server up! Happy hacking 🚀" });
});

app.use("/api/users", userRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/companies", companyRouter);
