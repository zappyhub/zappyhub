import express from "express";
import usersRouter from "@/routes/usersRouter";
import ordersRouter from "./routes/ordersRouter";
import companyRouter from "@/routes/companyRouter";
import authRouter from "./routes/authRouter";

export const app = express();
app.use(express.json());

app.get("/", (_req, res) => {
  return res.send({ Message: "Server up! Happy hacking 🚀" });
});

app.use("/api/users", usersRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/companies", companyRouter);
app.use("/api/auth", authRouter);
